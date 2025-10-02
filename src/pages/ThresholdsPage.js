import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setThresholds,
  addThreshold,
  removeThreshold,
} from "../features/thresholds/thresholdSlice";
import {
  getThresholds,
  createThreshold,
  deleteThreshold,
} from "../features/api/stockApi";
import "./ThresholdsPage.css";
import SymbolSelector from "../components/SymbolSelector";

const ThresholdsPage = ({ allStocks }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.thresholds);
  const user = useSelector((state) => state.auth.user);

  const [symbol, setSymbol] = useState("");
  const [limit, setLimit] = useState("");
  const [direction, setDirection] = useState("above");

  // 🔄 Load thresholds for this user
  useEffect(() => {
    if (!user || !user.email) return; // avoid errors on refresh

    async function fetchData() {
      try {
        const res = await getThresholds(user.email);
        dispatch(setThresholds(res.data));
      } catch (err) {
        console.error("Failed to fetch thresholds:", err);
      }
    }
    fetchData();
  }, [dispatch, user]); // safe, runs when user becomes available

  const handleAdd = async () => {
    if (!limit) return alert("Please enter a limit");
    if (!user || !user.email) return alert("User not logged in");

    try {
      const newThreshold = {
        email: user.email,
        symbol,
        limit,
        direction,
      };
      const res = await createThreshold(newThreshold);
      dispatch(addThreshold(res.data.threshold));
      setLimit("");
    } catch (err) {
      console.error("Failed to add threshold:", err);
    }
  };

  const handleDelete = async (t) => {
    console.log(t)
    try {
      await deleteThreshold({
        email: t.email,
        symbol: t.symbol,
        limit: t.limit,
        direction: t.direction
      });
      dispatch(removeThreshold(t._id));
      alert("Threshold Successfully deleted")
    } catch (err) {
      console.error("Failed to delete threshold:", err);
    }
  };

  return (
    <div className="thresholds"> 
      <div className="add-form">
        <SymbolSelector symbols={
          allStocks.map((d)=> d.symbol)} selected={symbol} 
          onChange={(val) =>
          setSymbol(val)
          }
        />
        <select value={direction} onChange={(e) => setDirection(e.target.value)}>
          <option value="above">Above</option>
          <option value="below">Below</option>
        </select>
        <input
          type="number"
          placeholder="Limit Price"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Direction</th>
            <th>Limit</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((t) => (
            <tr key={t._id}>
              <td>{t.symbol}</td>
              <td>{t.direction}</td>
              <td>{t.limit}</td>
              <td>
                <button onClick={() => handleDelete(t)}>❌ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ThresholdsPage;
