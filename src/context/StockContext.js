import React, { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import { io } from "socket.io-client";

const StockContext = createContext();

const initialState = {
  prices: {},
  alerts: [],
};

function stockReducer(state, action) {
  switch (action.type) {
    case "NEW_PRICE":
      const { symbol, price, ts } = action.payload;
      const updated = [
        ...(state.prices[symbol] || []),
        { price, timestamp: ts },
      ];
      return {
        ...state,
        prices: {
          ...state.prices,
          [symbol]: updated.slice(-50),
        },
      };

    case "INIT_HISTORY":
      return {
        ...state,
        prices: {
          ...state.prices,
          [action.payload.symbol]: action.payload.history,
        },
      };

    case "NEW_ALERT":
      return {
        ...state,
        alerts: [action.payload, ...(state.alerts || [])].slice(0, 10),
      };

    default:
      return state;
  }
}

export const StockProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stockReducer, initialState);

  // ✅ make initHistory stable
  const initHistory = useCallback((symbol, history) => {
    dispatch({ type: "INIT_HISTORY", payload: { symbol, history } });
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:3001", {
      auth: { token: `Bearer ${localStorage.getItem("token")}` },
    });

    window.stockSocket = socket;

    socket.on("stock-price", (data) => {
      dispatch({ type: "NEW_PRICE", payload: data });
    });

    socket.on("stock-alert", (data) => {
      dispatch({ type: "NEW_ALERT", payload: data });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <StockContext.Provider
      value={{
        prices: state.prices,
        alerts: state.alerts,
        initHistory, // expose stable function
      }}
    >
      {children}
    </StockContext.Provider>
  );
};

export const useStocks = () => useContext(StockContext);
