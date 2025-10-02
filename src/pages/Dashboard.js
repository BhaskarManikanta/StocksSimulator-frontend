import { useState, useEffect } from "react";
import ThresholdsPage from "./ThresholdsPage";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StockChart from "../components/StockChart";
import SymbolSelector from "../components/SymbolSelector";
import { useStocks } from "../context/StockContext";
import { fetchStockHistory, fetchStocks } from "../features/api/stockApi"; 
import { logout } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.css";
import AlertsPanel from "../components/AlertsPanel";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState("dashboard");
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [allStocks, setAllStocks] = useState([]);

  const { prices, alerts, initHistory } = useStocks();
  const user = useSelector((state) => state.auth.user);
  const joinDate = new Date(user.joinAt);

  // 🔄 Load available stocks from backend
  useEffect(() => {
    const loadStocks = async () => {
      try {
        const res = await fetchStocks();
        setAllStocks(res.data); 
        if (res.data.length > 0) {
          setSelectedSymbol(res.data[0].symbol); // default to first stock
        }
      } catch (err) {
        console.error("Failed to fetch stocks:", err);
      }
    };
    loadStocks();
  }, []);

  // load history when symbol changes
  useEffect(() => {
    if (!selectedSymbol) return;

    // 👉 Fetch last 50 prices from backend
    const loadHistory = async () => {
      try {
        const res = await fetchStockHistory(selectedSymbol);
        initHistory(selectedSymbol, res.data); // push into context
      } catch (err) {
        console.error("Failed to fetch history:", err);
      }
    };

    loadHistory();
  }, [selectedSymbol,initHistory]); // ✅ only depends on symbol

  const chartData = prices[selectedSymbol] || [];

  return (
    <div className="dashboard">
      <Sidebar onNavigate={setPage} />
      <div className="main">
        <Navbar user={user} />
        <div className="content">
          {page === "dashboard" && (
            <>
              <h2>📊 Stock Dashboard</h2>
              <SymbolSelector
                symbols={allStocks.map((s) => `${s.symbol} - ${s.name}`)}
                selected={selectedSymbol}
                onChange={(val) =>
                  setSelectedSymbol(val.split(" - ")[0]) // extract symbol only
                }
              />
              <StockChart data={chartData} symbol={selectedSymbol} />
              <AlertsPanel alerts={alerts} />
            </>
          )}

          {page === "stocks" && (
    <div className="stocks-list">
    <h2>📈 Stocks List</h2>
    <div className="stocks-table">
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {allStocks.map((s) => (
            <tr key={s.symbol}>
              <td>{s.symbol}</td>
              <td>{s.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}


          {page === "thresholds" && (
            <>
              <h2>⚠️ Your Thresholds</h2>
              <ThresholdsPage allStocks={allStocks} />
            </>
          )}
          {page === "profile" && (
  <div className="profile-page">
    <h2>👤 User Profile</h2>
    <div className="profile-card">
      <p><strong>Email:</strong> {user.email || "Not Logged In"}</p>
      <p><strong>Member Since:</strong> {joinDate.toLocaleDateString("en-GB")}</p>
      <p><strong>Status:</strong> Active</p>
      <button className="logout-btn" onClick={() => dispatch(logout())}>
        🚪 Logout
      </button>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
