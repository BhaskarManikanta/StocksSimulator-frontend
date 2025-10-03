import axios from "axios";

const API = axios.create({ baseURL: "http://13.60.89.123" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ---- Auth APIs ----
export const loginUser = (data) => API.post("/user/login", data);
export const registerUser = (data) => API.post("/user/signup", data);


// Thresholds
export const getThresholds = (email) => API.get(`/api/thresholds/${email}`);
export const createThreshold = (data) => API.post("/api/thresholds", data);
export const deleteThreshold = (payload) => API.delete("/api/thresholds", { data: payload });


// ---- Stock Price History ----
export const fetchStockHistory = (symbol, limit = 50) =>
  API.get(`/stocks/history/${symbol}?limit=${limit}`);

// ---- Stocks  ----
export const fetchStocks = () => API.get("/stocks/stocks");