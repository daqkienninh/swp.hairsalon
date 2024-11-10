import React, { forwardRef } from "react";
import { AiOutlineCopyright } from "react-icons/ai";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = forwardRef((props, ref) => {
  return (
    <footer ref={ref} className="bg-[#E9EFEC] py-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Column 1 - Increased width */}
          <div className="md:col-span-5 pl-10">
            <h3 className="text-xl font-semibold mb-4 text-[#1A4D2E]">
              Về Hair Harmony
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Chào mừng bạn đến với{" "}
              <span className="font-semibold">Hair Harmony</span>, nơi phong
              cách và sự tự tin của bạn được tỏa sáng. Chúng tôi chuyên cung cấp
              các dịch vụ về tóc chuyên nghiệp và các dịch vụ thư giãn dành cho
              mọi người.
              <br />
              <br />
              Với đội ngũ thợ giàu kinh nghiệm và tận tâm, chúng tôi cam kết
              mang đến một trải nghiệm tuyệt vời nhất. Tại{" "}
              <span className="font-semibold">Hair Harmony</span>, chúng tôi
              không chỉ cắt tóc, mà còn tạo ra phong cách và sự tự tin cho bạn.
            </p>
          </div>

          {/* Column 2 - Reduced width */}
          <div className="md:col-span-2 pl-5 pr-5">
            <h3 className="text-xl font-semibold mb-4 text-[#1A4D2E]">
              Dịch vụ
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800 transition duration-300"
                >
                  Các dịch vụ cho nam
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800 transition duration-300"
                >
                  Các dịch vụ cho nữ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800 transition duration-300"
                >
                  Spa & thư giãn
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Reduced width */}
          <div className="md:col-span-5 pr-10 pl-10">
            <h3 className="text-xl font-semibold mb-4 text-[#1A4D2E]">
              Hỗ trợ khách hàng
            </h3>
            <button className="mt-2 w-1/2 py-2 bg-[#B6C4B6] text-[#163020] font-semibold rounded-md hover:bg-[#CEE5D0] transition duration-300">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSe7ze2Bl9VGUyTTn6kgp3CwoiFBwtJkn0se4AQsdbACQJ1vZA/viewform"> Cần hỗ trợ</a>
            </button>
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4 text-[#1A4D2E]">
                Kết nối với chúng tôi
              </h4>
              <div className="flex space-x-4">
                <a
                  href="facebook"
                  className="text-gray-600 hover:text-gray-800 transition duration-300"
                >
                  <FaFacebookF size={20} />
                </a>
                <a
                  href="twitter"
                  className="text-gray-600 hover:text-gray-800 transition duration-300"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href="instagram"
                  className="text-gray-600 hover:text-gray-800 transition duration-300"
                >
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-center flex items-center justify-center text-[#1A4D2E]">
            <AiOutlineCopyright className="mr-1" />
            <span>2024 Hair Harmony. Tất cả các quyền được bảo lưu.</span>
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
