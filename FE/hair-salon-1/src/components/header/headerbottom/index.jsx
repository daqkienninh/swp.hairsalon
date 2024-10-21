import { Button, Flex, Input } from "antd";
import React, { useState } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function HeaderBottom() {
  const [show, setShow] = useState(false);

  const categories = [
    { name: "Cho nữ", icon: "👩" },
    { name: "Cho nam", icon: "👨" },
    { name: "Spa và Relax", icon: "💆" },
  ];

  return (
    <div className="w-full bg-[#FCF8E8] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex-col lg:flex-row items-center justify-between w-full px-4 py-4 lg:py-0 h-full lg:h-24 gap-4">
          {/* Shop by Category */}
          <div className="relative">
            <div
              onClick={() => setShow(!show)}
              className="flex h-12 cursor-pointer items-center gap-2 text-primeColor"
            >
              <HiOutlineMenuAlt4 className="w-5 h-5 text-[#94B49F]" />
              <p className="text-[14px] font-normal text-[#94B49F]">
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
          </div>

          {/* Search Input */}
          <div className="flex-grow max-w-[600px] w-full">
            <Input
              className="w-full h-12 text-base text-primeColor bg-white rounded-xl border-[#94B49F] hover:border-[#94B49F] focus:border-[#94B49F]"
              placeholder="Tìm kiếm dịch vụ"
            />
          </div>

          {/* Booking Button */}
          <div>
            <Link to="/booking">
              <Button className="w-40 h-12 bg-[#94B49F] hover:bg-[#e09b6f] text-white font-semibold text-lg rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#ECB390] focus:ring-opacity-50">
                Đặt lịch
              </Button>
            </Link>
          </div>
        </Flex>
      </div>
    </div>
  );
}

export default HeaderBottom;
