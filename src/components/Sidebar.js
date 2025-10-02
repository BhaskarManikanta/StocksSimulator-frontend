import "./Sidebar.css";

const Sidebar = ({ onNavigate }) => {
  return (
    <div className="sidebar">
      <h2 className="logo">📈 StockSim</h2>
      <ul>
        <li onClick={() => onNavigate("dashboard")}>Dashboard</li>
        <li onClick={() => onNavigate("stocks")}>Stocks</li>
        <li onClick={() => onNavigate("thresholds")}>Thresholds</li>
        <li onClick={() => onNavigate("profile")}>Profile</li>
      </ul>
    </div>
  );
};

export default Sidebar;
