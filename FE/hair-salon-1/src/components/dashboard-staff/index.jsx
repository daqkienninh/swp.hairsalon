import React, { useState } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Flex, Layout, Menu, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { MDBBtn } from "mdb-react-ui-kit";
import { logout } from '../../redux/features/userSlice';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label: <Link to={`/staff/${key}`}>{label}</Link>,
  };
}
const items = [
  getItem("Manage Service", "service"),
  getItem("Manage Appointment", "appointment"),
];
const DashboardStaff = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']} items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="flex items-center justify-between px-4"
        >
          <div className="flex items-center justify-start rtl:justify-end ">
            <a href="/staff" className="flex ms-2 md:me-24 mt-2.5">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap ">{user.fullName}</span>
            </a>
          </div>
          <div className="text-xl mr-10"
          >
            <div onClick={() => navigate("/viewstaff")} className="flex">
              <FaUser />
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Hair Harmony ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default DashboardStaff;