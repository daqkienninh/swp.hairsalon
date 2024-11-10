import { Button, Flex, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../config/axios";

function HeaderBottom() {
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

  const navigate = useNavigate();

  const categories = [
    { name: "Cho nữ", icon: "👩" },
    { name: "Cho nam", icon: "👨" },
    { name: "Spa và Relax", icon: "💆" },
  ];

  useEffect(() => {
    // Replace this with your actual API call
    const fetchServices = async () => {
      const response = await api.get("/api/service");
      setServices(response.data);
    };

    fetchServices();
  }, []);
  const handleBooking = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.setItem("redirectPath", window.location.pathname);
      toast.error("Vui lòng đăng nhập để tiếp tục!");
      navigate("/login");
      return;
    }
    // Nếu đã đăng nhập thì chuyển đến trang booking
    navigate("/booking");
  };
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = services.filter((service) =>
      service.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  const handleServiceClick = (serviceId) => {
    navigate(`/service-detail/${serviceId}`);
    setSearchTerm(""); // Clear the search term
    setFilteredServices([]); // Clear the filtered services
  };

  return (
    <div className="w-full bg-[#C4DAD2] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex-col lg:flex-row items-center justify-between w-full px-4 py-4 lg:py-0 h-full lg:h-24 gap-4">
          {/* Shop by Category */}
          {/* <div className="relative">
            <div
              onClick={() => setShow(!show)}
              className="flex h-12 cursor-pointer items-center gap-2 text-primeColor pl-5"
            >
              <HiOutlineMenuAlt4 className="w-5 h-5 text-[#163020]" />
              <p className="text-[16px] font-normal text-[#163020]">
                Danh mục dịch vụ
              </p>
            </div>
            {show && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 z-50 bg-white shadow-lg rounded-md mt-2 w-64"
              >
                {categories.map((category, index) => (
                  <Link
                    to={`/category/${category.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    key={index}
                  >
                    <div className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors duration-200">
                      <span className="text-2xl mr-3">{category.icon}</span>
                      <span className="text-gray-700">{category.name}</span>
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </div> */}
          {/* Left spacer */}
          <div className="lg:w-1/6"></div>
          {/* Search Input */}
          <div className="flex-grow max-w-[600px] w-full">
            <Input
              className="w-full h-12 text-base text-primeColor bg-white rounded-xl border-[#94B49F] hover:border-[#94B49F] focus:border-[#94B49F]"
              placeholder="Tìm kiếm dịch vụ"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && filteredServices.length > 0 && (
              <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-[600px] bg-white shadow-lg rounded-md mt-2 z-50">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleServiceClick(service.id)}
                  >
                    {service.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Booking Button */}
          <div>
            <button
              onClick={handleBooking}
              className="w-40 h-12 bg-[#94B49F] text-[#163020] font-semibold text-lg rounded-md shadow-md hover:bg[#CEE5D0]"
            >
              Đặt lịch
            </button>
          </div>
        </Flex>
      </div>
    </div>
  );
}

export default HeaderBottom;
