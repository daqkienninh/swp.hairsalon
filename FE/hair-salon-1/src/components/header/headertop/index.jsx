import React, { useRef, useEffect, useState } from "react";
import "./index.css";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../../config/axios";
import { toast } from "react-toastify";

function Header() {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const location = useLocation();
  const topRef = useRef(null);
  const [customerId, setCustomerId] = useState(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (topRef.current) {
        if (window.scrollY > 0) {
          topRef.current.classList.add("sticky");
        } else {
          topRef.current.classList.remove("sticky");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await api.get("/api/customer");
  
        // Filter response data to only include stylists where user.id matches account.id
        const matchingCustomer = response.data.filter(item => item.account.id === user.id);
  
        // Extract stylist IDs from matching stylists
        const ids = matchingCustomer.map(item => item.id);
        if (ids.length > 0) {
          setCustomerId(ids[0]); // Set stylistID if there are matching stylists
        }
  
        console.log("Matching Stylist IDs: ", ids);
        console.log("User ID: ", user.id);
      } catch (error) {
        toast.error(error.response?.data || "Error fetching stylists");
      }
    };

    fetchCustomer();
  }, [customerId]);


  return (
    <div className="header" ref={topRef}>
      <div className="navbar">
        <Link to="/" className="logo">
          Hair Harmony
        </Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Trang chủ
          </Link>
          <Link to="/services" className="nav-link">
            Dịch vụ
          </Link>
          <Link to="/about" className="nav-link">
            Về chúng tôi
          </Link>
          <Link to="/contact" className="nav-link">
            Liên hệ
          </Link>

          {user ? (
            <> {customerId && (
              <Link to={`/history-booking/${customerId}`} className="nav-link">
                Lịch sử cuộc hẹn
              </Link>
            )}
              <div className="user-menu">
                <Link to="/customer" className="nav-link">
                  <FaUser className="profile-icon" />
                </Link>
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <Link to="/login" className="nav-link">
              Đăng nhập
            </Link>
          )}
        </nav>

        {/* <div className="search-cart">
          <div className="search-box">
            <input type="text" placeholder="Tìm kiếm..." />
            <FaSearch className="search-icon" />
          </div>
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default Header;
