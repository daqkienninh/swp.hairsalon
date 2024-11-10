import React, { useState } from 'react';
import { Flex, Layout, Menu, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHome, FaUser } from "react-icons/fa";
import { AiOutlineCopyright } from 'react-icons/ai';
import { MdOutlineHomeRepairService } from "react-icons/md";
import { GrSchedules } from "react-icons/gr";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label: <Link to={`/staff${key}`} className="flex items-center gap-2"><span>{label}</span></Link>,
  };
}
const items = [
  getItem("Trang chủ", "", <FaHome className="text-lg" />),
  getItem("Quản lý Dịch vụ", "/service", <MdOutlineHomeRepairService className="text-lg" />),
  getItem("Quản lý Cuộc hẹn", "/appointment", <GrSchedules className="text-lg" />),
  getItem("Quản lý Đổi thưởng", "/reward", <GrSchedules className="text-lg" />),
  getItem("Quản lý Nhận thưởng", "/recived", <GrSchedules className="text-lg" />),
];
const DashboardStaff = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Layout className="min-h-screen">
      <Sider
        breakpoint="lg"
        collapsedWidth="80" // Width when collapsed
        width={250} // Custom width when expanded
        onBreakpoint={(broken) => console.log(broken)}
        onCollapse={(collapsed, type) => console.log(collapsed, type)}
        className="bg-[#E9EFEC]"
      >
        <div className="h-16 flex items-center justify-center font-semibold text-xl text-black bg-[#6A9C89] border-b border-teal-600">
          HAIR HARMONY
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['0']}
          items={items}
          className="text-white bg-[#E9EFEC]"
          style={{
            padding: '2rem 0',
          }}
        />
        <a className="text-black bg-[#E9EFEC] ml-14 font-bold" href="https://docs.google.com/spreadsheets/d/1Ja0YkvudKD-0-PSRIhR3FeTW5IImjU88DFHUcjuoLqA/edit?resourcekey=&gid=1889532333#gid=1889532333">Hỗ trợ khách hàng</a>
      </Sider>
      <Layout>
        <Header className="flex items-center justify-between px-6 bg-[#E9EFEC]">
          <div className="flex items-center">
            <a href="/staff" className="text-xl font-semibold">
              Xin chào {user.fullName}!
            </a>
          </div>
          <div onClick={() => navigate("/viewstaff")} className="text-2xl cursor-pointer border-teal-600">
            <FaUser />
          </div>
        </Header>
        <Content className="m-6 p-6 bg-white rounded-lg shadow-lg">
          <Outlet />
        </Content>
        <Footer className="flex items-center justify-center p-4 text-black bg-[#6A9C89]">
          <AiOutlineCopyright className="mr-1" />
          <span>2024 Hair Harmony. Tất cả các quyền được bảo lưu.</span>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default DashboardStaff;