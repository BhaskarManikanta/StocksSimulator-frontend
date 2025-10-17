import { motion, AnimatePresence } from "framer-motion";
import { useStocks } from "../context/StockContext";
import "./AlertsPanel.css";

const AlertsPanel = () => {
  const { alerts } = useStocks();

  return (
    <motion.div
      className="alerts-panel"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h3 className="alerts-title">🔔 Live Stock Alerts</h3>

      {alerts.length === 0 ? (
        <p className="no-alerts">No alerts yet — everything’s stable 😎</p>
      ) : (
        <ul className="alerts-list">
          <AnimatePresence>
            {alerts.map((a, idx) => (
              <motion.li
                key={idx}
                className={`alert-item ${
                  a.direction === "above" ? "alert-up" : "alert-down"
                }`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <div className="alert-header">
                  <strong>{a.symbol}</strong>
                  <span className="alert-time">
                    {new Date(a.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="alert-body">
                  {a.direction === "above" ? "📈 Rose above" : "📉 Fell below"}{" "}
                  <span className="alert-limit">${a.limit}</span> (Now:{" "}
                  <b>${a.price}</b>)
                </p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </motion.div>
  );
};

export default AlertsPanel;
