import React, { useRef, useEffect, useState } from "react";
import "./index.css";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function Header() {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const location = useLocation();
  const topRef = useRef(null);
  const [customerId, setCustomerId] = useState(null);
  const [showLinks, setShowLinks] = useState(false);
  const [point, setPoint] = useState([]);

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
        const matchingCustomer = response.data.filter(
          (item) => item.account.id === user.id
        );

        // Extract stylist IDs from matching stylists
        const ids = matchingCustomer.map((item) => item.id);
        if (ids.length > 0) {
          setCustomerId(ids[0]); // Set stylistID if there  are matching stylists
        }

        console.log("Matching Customer IDs: ", ids);
        console.log("User ID: ", user.id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCustomer();
  }, [customerId]);

  useEffect(() => {
    const fetchCustomerPoint = async () => {
      if (!customerId) {
        return;
      }
      try {
        const response = await api.get(`/api/customer/${customerId}`);
        setPoint(response.data);
        console.log("Po", response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomerPoint();
  }, [customerId]);

  return (
    <div className="header" ref={topRef}>
      <div className="navbar">
        <Link onClick={() => setShowLinks(false)} to="/" className="logo">
          Hair Harmony
        </Link>

        <nav className="nav-links">
          <Link onClick={() => setShowLinks(false)} to="/" className="nav-link">
            Trang chủ
          </Link>
          <Link onClick={() => setShowLinks(false)} to="/services" className="nav-link">
            Dịch vụ
          </Link>
          <Link onClick={() => setShowLinks(false)} to="/about" className="nav-link">
            Về chúng tôi
          </Link>

          {user ? (
            <> {customerId && (
              <div className="flex gap-4 lg:mt-0 items-center pr-6 cursor-pointer relative">
                <div onClick={() => { setShowLinks(!showLinks) }} className="flex">
                  <span style={{ marginLeft: '8px' }}>Khác</span> {/* Optional text for the toggle */}
                </div>

                {showLinks && (
                  <motion.ul
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-8 right-0 z-50 bg-primeColor w-44 text-[#1A4D2E] h-auto p-4 pb-6"
                  >
                    <Link onClick={() => setShowLinks(false)} to={`/history-booking/${customerId}`}>
                      <li className="text-gray-400 px-0 py-2 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Lịch sử cuộc hẹn
                      </li>
                    </Link>
                    <Link onClick={() => setShowLinks(false)} to={`/reward/${customerId}`}>
                      <li className="text-gray-400 px-0 py-2 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Đổi điểm thưởng
                      </li>
                    </Link>
                    <Link onClick={() => setShowLinks(false)} to={`/recieved/${customerId}`}>
                      <li className="text-gray-400 px-0 py-2 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Lịch sử đổi
                      </li>
                    </Link>
                    <li className="text-gray-400 px-0 py-2 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      Điểm: {point.loyaltyPoint}
                    </li>
                  </motion.ul>
                )}
              </div>
            )}
              <div className="user-menu">
                <Link to="/customer" className="nav-link">
                  <FaUser className="profile-icon" />
                </Link>
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item"></Link>
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
