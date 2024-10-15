import React from 'react'
import "./index.css"
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa'



function Header() {
  return (
    <div className='header'>
      <div className="navbar">
        {/* Logo */}
        <div className="logo">HARMONY</div>

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
        
      </div>
    </div>
    
  )
}

export default Header