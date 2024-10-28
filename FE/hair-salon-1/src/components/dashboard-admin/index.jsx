import React, { useState } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { MDBBtn } from "mdb-react-ui-kit";
import { logout } from '../../redux/features/userSlice';
import { AiOutlineCopyright } from 'react-icons/ai';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label: <Link to={`/admin/${key}`}>{label}</Link>,
    };
}
const items = [
    getItem("Manage Account", "manageaccount"),
    getItem("Manage Customer", "managecustomer"),
    getItem("Manage Manager", "managemanager"),
    getItem("Manage Staff", "managestaff"),
    getItem("Manage Stylist", "managestylist"),
];
const DashboardAdmin = () => {
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
                    <div class="flex items-center justify-start rtl:justify-end ">
                        <a href="/admin" class="flex ms-2 md:me-24 mt-2.5">
                            <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap ">{user.fullName}</span>
                        </a>
                    </div>
                    <div className="text-xl mr-10"
                    >
                        <div onClick={() => navigate("/viewadmin")} className="flex">
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

                    <p className="text-sm text-center flex items-center justify-center text-[#1A4D2E]">
                        <AiOutlineCopyright className="mr-1" />
                        <span>2024 Hair Harmony. Tất cả các quyền được bảo lưu.</span>
                    </p>

                </Footer>
            </Layout>
        </Layout>
    );
};
export default DashboardAdmin;