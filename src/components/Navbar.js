import React from "react";
import "./Navbar.css";
import { FaBell, FaUserCircle, FaSignOutAlt, FaChartLine } from "react-icons/fa";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <FaChartLine className="navbar-logo" />
        <h2 className="navbar-title">StockPulse</h2>
      </div>

      <div className="navbar-center">
        <div className="navbar-user-info">
          <FaUserCircle className="user-icon" />
          <span>{user?.email || "Guest User"}</span>
        </div>
      </div>

      <div className="navbar-right">
        <button className="icon-button">
          <FaBell />
          <span className="notif-dot"></span>
        </button>

        <button className="logout-btn" onClick={onLogout}>
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
