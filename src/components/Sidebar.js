import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaChartLine,
  FaBell,
  FaUser,
} from "react-icons/fa";

import "./Sidebar.css";

const Sidebar = ({ onNavigate }) => {
  const [active, setActive] = useState("dashboard");

  const handleClick = (page) => {
    setActive(page);
    onNavigate(page);
  };

  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      key: "stocks",
      label: "Stocks",
      icon: <FaChartLine />,
    },
    {
      key: "thresholds",
      label: "Thresholds",
      icon: <FaBell />,
    },
    {
      key: "profile",
      label: "Profile",
      icon: <FaUser />,
    },
  ];

  return (
    <aside className="sidebar">
      {/* LOGO */}
      <div className="sidebar-header">
        <div className="logo-wrapper">
          <span className="logo-icon">📈</span>
          <div>
            <h2>StockSim</h2>
            <p>Live Market Monitor</p>
          </div>
        </div>
      </div>

      {/* MENU */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.key}
            className={`sidebar-item ${
              active === item.key ? "active" : ""
            }`}
            onClick={() => handleClick(item.key)}
          >
            <span className="sidebar-icon">{item.icon}</span>

            <span className="sidebar-label">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* FOOTER */}
      <div className="sidebar-footer">
        <p>Realtime Stock Simulator</p>
      </div>
    </aside>
  );
};

export default Sidebar;