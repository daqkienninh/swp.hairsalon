import React, { useRef, useEffect } from "react";
import "./index.css";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Header({ scrollToFooter }) {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const location = useLocation();
  const topRef = useRef(null);

  useEffect(() => {
    if (location.pathname === "/") {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div ref={topRef} />
      <div className="header">
        <div className="navbar">
          {/* Logo */}
          <div className="logo">HAIR HARMONY</div>
          {/* Navigation Links */}
          <nav className="nav-links">
            <a href="/" className="nav-link" onClick={handleHomeClick}>
              Trang chủ
            </a>
            <Link to="/services" className="nav-link">
              Dịch vụ
            </Link>
            <Link
              to="#"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToFooter();
              }}
            >
              Thông tin
            </Link>
            <div>
              {user == null ? (
                <Link to="/login" className="nav-link">
                  Đăng nhập
                </Link>
              ) : (
                <div>
                  <div>
                    <Link to="/history-booking" className="nav-link">
                      Lịch sử cuộc hẹn
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div>
              {user == null ? (
                <Link to="/login" className="nav-link"></Link>
              ) : (
                <div>
                  <div className="user">
                    <Link to="/customer">
                      <FaUser className="profile-icon" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;
