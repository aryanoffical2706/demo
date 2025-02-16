import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIsAuthenticated(false); 
    navigate("/login"); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/dashboard" className="navbar-brand">
          Channelise
        </Link>
      </div>
      {isAuthenticated && (
        <div className="navbar-right">
          <Link to="/create-broadcast" className="nav-link">
            Create Broadcast
          </Link>
          <Link to="/notifications" className="nav-link">
            Notifications
          </Link>
          <button onClick={handleLogout} className="nav-link">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;