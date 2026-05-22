import React from "react";
import "./Navbar.css";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar">

      {/* LEFT */}
      <div className="navbar-left">
        <div className="navbar-brand">
          <div className="logo-circle">📈</div>

          <div>
            <h2>StockPulse</h2>
            <p>Realtime Market Dashboard</p>
          </div>
        </div>
      </div>

      {/* CENTER */}
      <div className="navbar-center">
        <div className="market-status">
          <div className="live-dot"></div>

          <span>Market Active</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">

        <button className="icon-button">
          🔔
          <span className="notif-dot"></span>
        </button>

        <div className="navbar-user">

          <div className="user-avatar">
            {user?.email?.charAt(0).toUpperCase() || "G"}
          </div>

          <div className="user-details">
            <span className="welcome-text">
              Welcome Back
            </span>

            <strong>
              {user?.email || "Guest User"}
            </strong>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;