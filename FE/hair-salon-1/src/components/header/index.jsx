import React from "react";
import "./index.css";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="navbar">
        {/* Logo */}
        <div className="logo">OREBI</div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <a href="/" className="nav-link">
            Home
          </a>
          <a href="/shop" className="nav-link">
            Shop
          </a>
          <a href="/about" className="nav-link">
            About
          </a>
          <a href="/contact" className="nav-link">
            Contact
          </a>
          <a href="/journal" className="nav-link">
            Journal
          </a>
        </nav>

        {/* Profile & Cart */}
        <div className="user">
          <div className="profile-menu">
            <Link to="/customer">
              <FaUser className="profile-icon" />
            </Link>
          </div>
          <div className="cart-menu">
            <FaShoppingCart className="cart-icon" />
            <span className="cart-count">0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
