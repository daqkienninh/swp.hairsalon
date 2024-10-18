import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import {
    ShopOutlined,
    ToolOutlined,
} from '@ant-design/icons';
import './index.css'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const DashboardAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <SubMenu icon={<ShopOutlined />} title="Manage Account">
                        <Menu.Item icon={<ToolOutlined />}>
                            <Link to="/admin/managestylist">Manage Stylist</Link>
                        </Menu.Item>
                        <Menu.Item icon={<ToolOutlined />}>
                            <Link to="/admin/managecustomer">Manage Customer</Link>
                        </Menu.Item>
                        <Menu.Item icon={<ToolOutlined />}>
                            <Link to="/admin/managestaff">Manage Staff</Link>
                        </Menu.Item>
                        <Menu.Item icon={<ToolOutlined />}>
                            <Link to="/admin/managemanager">Manage Manager</Link>
                        </Menu.Item>
                    </SubMenu>
                    {/* Add more main menu items here */}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Admin Dashboard ©2024 Created by HairHarmony</Footer>
            </Layout>
        </Layout>
    );
};
export default DashboardAdmin;
