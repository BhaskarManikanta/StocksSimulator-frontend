import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StockChart from "../components/StockChart";
import SymbolSelector from "../components/SymbolSelector";
import AlertsPanel from "../components/AlertsPanel";
import ThresholdsPage from "./ThresholdsPage";

import { useStocks } from "../context/StockContext";
import { fetchStockHistory, fetchStocks } from "../features/api/stockApi";
import { logout } from "../features/auth/authSlice";

import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState("dashboard");
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [allStocks, setAllStocks] = useState([]);

  const { prices, alerts, initHistory } = useStocks();

  const user = useSelector((state) => state.auth.user);

  const joinDate = user?.joinAt
    ? new Date(user.joinAt).toLocaleDateString("en-GB")
    : "N/A";

  // ================= FETCH STOCKS =================
  useEffect(() => {
    const loadStocks = async () => {
      try {
        const res = await fetchStocks();

        setAllStocks(res.data);

        if (res.data.length > 0) {
          setSelectedSymbol(res.data[0].symbol);
        }
      } catch (err) {
        console.error("Failed to fetch stocks:", err);
      }
    };

    loadStocks();
  }, []);

  // ================= FETCH STOCK HISTORY =================
  useEffect(() => {
    if (!selectedSymbol) return;

    const loadHistory = async () => {
      try {
        const res = await fetchStockHistory(selectedSymbol);

        initHistory(selectedSymbol, res.data);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      }
    };

    loadHistory();
  }, [selectedSymbol, initHistory]);

  const chartData = prices[selectedSymbol] || [];
  
  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <Sidebar onNavigate={setPage} />

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        <Navbar user={user} />

        <div className="dashboard-content">

          {/* DASHBOARD PAGE */}
          {page === "dashboard" && (
            <>
              <div className="page-header">
                <div>
                  <h1>Stock Dashboard</h1>
                  <p>Monitor live stock prices and alerts in real-time.</p>
                </div>
              </div>

              <div className="dashboard-topbar">
                <SymbolSelector
                  symbols={allStocks.map(
                    (s) => `${s.symbol} - ${s.name}`
                  )}
                  selected={selectedSymbol}
                  onChange={(val) =>
                    setSelectedSymbol(val.split(" - ")[0])
                  }
                />
              </div>

              <div className="dashboard-grid">

                {/* CHART CARD */}
                <section className="card chart-card">
                  <div className="card-header">
                    <h3>{selectedSymbol} Price Chart</h3>
                  </div>

                  <StockChart
                    data={chartData}
                    symbol={selectedSymbol}
                  />
                </section>

                {/* ALERT CARD */}
                <section className="card alerts-card">
                  <div className="card-header">
                    <h3>Recent Alerts</h3>
                  </div>

                  <AlertsPanel alerts={alerts} />
                </section>

              </div>
            </>
          )}

          {/* STOCKS PAGE */}
          {page === "stocks" && (
            <section className="card">
              <div className="card-header">
                <h2>Stocks List</h2>
              </div>

              <div className="table-container">
                <table className="stocks-table">
                  <thead>
                    <tr>
                      <th>Symbol</th>
                      <th>Company</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allStocks.map((stock) => (
                      <tr key={stock.symbol}>
                        <td>{stock.symbol}</td>
                        <td>{stock.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* THRESHOLDS PAGE */}
          {page === "thresholds" && (
            <section className="card">
              <div className="card-header">
                <h2>Threshold Alerts</h2>
              </div>

              <ThresholdsPage allStocks={allStocks} />
            </section>
          )}

          {/* PROFILE PAGE */}
          {page === "profile" && (
            <section className="profile-wrapper">
              <div className="profile-card">
                <div className="profile-header">
                  <h2>User Profile</h2>
                </div>

                <div className="profile-info">
                  <div className="profile-row">
                    <span>Email</span>
                    <strong>{user?.email || "Not Logged In"}</strong>
                  </div>

                  <div className="profile-row">
                    <span>Member Since</span>
                    <strong>{joinDate}</strong>
                  </div>

                  <div className="profile-row">
                    <span>Status</span>
                    <strong className="active-status">
                      Active
                    </strong>
                  </div>
                </div>

                <button
                  className="logout-btn"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;