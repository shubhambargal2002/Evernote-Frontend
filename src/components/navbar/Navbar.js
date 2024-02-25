import React from "react";
import "./navbar.css";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const authToken = sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar_container">
    <div className="navbar">
      <h1>I-notebook</h1>
      {authToken ? (
        <button className="button" onClick={handleLogout}>
          Sign Out
        </button>
      ) : (
        <div className="buttons_container">
          <Link to="/login">
            <button className="button">Sign In</button>
          </Link>
          <Link to="/register">
            <button className="button">Sign Up</button>
          </Link>
        </div>
      )}
    </div>
    </div>
  );
};

export default Navbar;
