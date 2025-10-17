import React, { useState } from "react";
import "./Sidebar.css";
import { FaTachometerAlt, FaChartLine, FaBell, FaUser } from "react-icons/fa";

const Sidebar = ({ onNavigate }) => {
  const [active, setActive] = useState("dashboard");

  const handleClick = (page) => {
    setActive(page);
    onNavigate(page);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-logo">📈 StockSim</h2>
      </div>

      <ul className="sidebar-menu">
        <li
          className={active === "dashboard" ? "active" : ""}
          onClick={() => handleClick("dashboard")}
        >
          <FaTachometerAlt /> <span>Dashboard</span>
        </li>
        <li
          className={active === "stocks" ? "active" : ""}
          onClick={() => handleClick("stocks")}
        >
          <FaChartLine /> <span>Stocks</span>
        </li>
        <li
          className={active === "thresholds" ? "active" : ""}
          onClick={() => handleClick("thresholds")}
        >
          <FaBell /> <span>Thresholds</span>
        </li>
        <li
          className={active === "profile" ? "active" : ""}
          onClick={() => handleClick("profile")}
        >
          <FaUser /> <span>Profile</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
