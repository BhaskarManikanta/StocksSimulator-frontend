import { useStocks } from "../context/StockContext";
import "./AlertsPanel.css";

const AlertsPanel = () => {
  const { alerts } = useStocks();

  return (
    <div className="alerts-panel">
      <h3>🔔 Alerts</h3>
      {alerts.length === 0 ? (
        <p>No alerts yet.</p>
      ) : (
        <ul>
          {alerts.map((a, idx) => (
            <li key={idx}>
              <strong>{a.symbol}</strong> {a.direction} {a.limit} → Current {a.price}  
              <span>{new Date(a.time).toLocaleTimeString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertsPanel;
