import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHome, FaUser, FaUserCog, FaUsers, FaUserTag, FaUserTie } from "react-icons/fa";
import { AiOutlineCopyright } from 'react-icons/ai';
import { GiHairStrands } from "react-icons/gi";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label: (
            <Link to={`/admin${key}`} className="flex items-center gap-2">
                
                <span>{label}</span>
            </Link>
        ),
    };
}

const items = [
    getItem("Trang chủ", "", <FaHome className="text-lg" />),
    getItem("Quản lý Tài khoản", "/manageaccount", <FaUserCog className="text-lg" />),
    getItem("Quản lý Khách hàng", "/managecustomer", <FaUsers className="text-lg" />),
    getItem("Quản lý Manager", "/managemanager", <FaUserTie className="text-lg" />),
    getItem("Quản lý Nhân viên", "/managestaff", <FaUserTag className="text-lg" />),
    getItem("Quản lý Stylist", "/managestylist", <GiHairStrands className="text-lg" />),
];

const DashboardAdmin = () => {
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
            </Sider>
            <Layout>
                <Header className="flex items-center justify-between px-6 bg-[#E9EFEC]">
                    <div className="flex items-center">
                        <a href="/admin" className="text-xl font-semibold">
                            Xin chào {user.fullName}!
                        </a>
                    </div>
                    <div onClick={() => navigate("/viewadmin")} className="text-2xl cursor-pointer border-teal-600">
                        <FaUser />
                    </div>
                </Header>
                <Content className="m-6 p-6 bg-white rounded-lg shadow-lg">
                    <Outlet />
                </Content>
                <Footer className="flex items-center justify-center p-4 bg-gray-50 text-black">
                    <AiOutlineCopyright className="mr-1" />
                    <span>2024 Hair Harmony. Tất cả các quyền được bảo lưu.</span>
                </Footer>
            </Layout>
        </Layout>
    );
};

export default DashboardAdmin;
