import React, { useRef, useState } from "react";
import { Menu } from 'antd'
import SubMenu from 'antd/es/menu/SubMenu'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import {
  ShopOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { Content, Footer } from 'antd/es/layout/layout';
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { logout } from "../../redux/features/userSlice";
import { MDBBtn } from "mdb-react-ui-kit";
const DashboardStaff = () => {
  const user = useSelector((store) => store.user);
  const [showUser, setShowUser] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Navigate to the homepage after logout
  };
  return (
  
    <div className="flex flex-col min-h-screen">


      <nav class="fixed top-0 z-50 h-20 w-full  bg-[#CEE5D0] border-b border-gray-200">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start rtl:justify-end ">
              <a href="/staff" class="flex ms-2 md:me-24 mt-2.5">
                <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap ">HAIR HARMONY</span>
              </a>
            </div>
            <div class="flex items-center">
              <div class="flex items-center ms-3">
                <div className="gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
                  <div onClick={() => setShowUser(!showUser)} className="flex">
                    <FaUser />
                  </div>
                {showUser && (
                  <motion.ul
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-6 right-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
                  >
                      <div class="px-0 py-0 border-b-2" role="none">
                        <p class="text-sm text-gray-900 dark:text-white" role="none">
                          {user.fullName}
                        </p>
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                          {user.role}
                        </p>
                      </div>
                    
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      Profile
                    </li>
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      Others
                    </li>
                  </motion.ul>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-grow">
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-[#94B49F] border-r border-gray-200 sm:translate-x-0" aria-label="Sidebar static">
          <div class="h-full px-3 pb-4 overflow-y-auto  bg-[#CEE5D0]">
            <ul class="space-y-2 font-medium">
              <li class="flex items-center p-2 text-gray-900 rounded-lg whitespace-nowrap">
                <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>

                <Menu defaultSelectedKeys={['1']} mode={"vertical"} class="flex-1 ms-3">
                  <SubMenu title="Dashboard">
                    <Menu.Item>
                      <Link to="/staff/service">Manage Service</Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link to="/staff/appointment">Manage Appointment</Link>
                    </Menu.Item>
                  </SubMenu>
                </Menu>

              </li>

              <li>
                <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg">
                  <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span class="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                  <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">3</span>
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg">
                  <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                  <span class="flex-1 ms-3 whitespace-nowrap">Users</span>
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg">
                  <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                  </svg>
                  <span class="flex-1 ms-3 whitespace-nowrap">Products</span>
                </a>
              </li>
              <li class="flex items-center p-10 text-gray-900 rounded-lg">
                <div>
                  {user == null ? (
                    navigate("/")
                  ) : (
                    <div>
                      <MDBBtn
                        onClick={handleLogout}
                        style={{
                          backgroundColor: "#94B49F",
                          color: "white",
                          borderColor: "#94B49F",
                        }}
                      >
                        Log Out
                      </MDBBtn>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </aside>

        <main className="flex-grow p-4 sm:ml-64 mt-20">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="bg-white shadow-md rounded-lg p-6 min-h-[calc(100vh-rem)]">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      <footer className="bg-[#CEE5D0] text-gray-800 py-4 sm:ml-64">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">&copy; 2024 Hair Harmony. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-sm hover:text-gray-600">Privacy Policy</a>
              <a href="#" className="text-sm hover:text-gray-600">Terms of Service</a>
              <a href="#" className="text-sm hover:text-gray-600">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default DashboardStaff;
