import { motion, AnimatePresence } from "framer-motion";
import { useStocks } from "../context/StockContext";

import "./AlertsPanel.css";

const AlertsPanel = () => {
  const { alerts } = useStocks();

  return (
    <motion.div
      className="alerts-panel"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >

      {/* HEADER */}
      <div className="alerts-top">
        <div>
          <h3 className="alerts-title">
            Live Stock Alerts
          </h3>

          <p className="alerts-subtitle">
            Realtime threshold notifications
          </p>
        </div>

        <div className="alerts-count">
          {alerts.length}
        </div>
      </div>

      {/* EMPTY STATE */}
      {alerts.length === 0 ? (
        <div className="empty-alerts">
          <div className="empty-icon">🔔</div>

          <p>No active alerts yet</p>

          <span>
            Threshold notifications will appear here
          </span>
        </div>
      ) : (
        <ul className="alerts-list">

          <AnimatePresence>

            {alerts.map((alert, idx) => (
              <motion.li
                key={idx}
                className={`alert-card ${
                  alert.direction === "above"
                    ? "alert-up"
                    : "alert-down"
                }`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
              >

                {/* ALERT HEADER */}
                <div className="alert-header">

                  <div className="alert-symbol-group">
                    <div
                      className={`alert-indicator ${
                        alert.direction === "above"
                          ? "green"
                          : "red"
                      }`}
                    />

                    <strong className="alert-symbol">
                      {alert.symbol}
                    </strong>
                  </div>

                  <span className="alert-time">
                    {new Date(alert.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {/* ALERT BODY */}
                <div className="alert-body">

                  <p>
                    {alert.direction === "above"
                      ? "Price moved above threshold"
                      : "Price dropped below threshold"}
                  </p>

                  <div className="alert-prices">

                    <div className="price-box">
                      <span>Limit</span>
                      <strong>${alert.limit}</strong>
                    </div>

                    <div className="price-box">
                      <span>Current</span>
                      <strong>${alert.price}</strong>
                    </div>

                  </div>
                </div>

              </motion.li>
            ))}

          </AnimatePresence>

        </ul>
      )}
    </motion.div>
  );
};

export default AlertsPanel;