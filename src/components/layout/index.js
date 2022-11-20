import React, { useEffect } from 'react';
import {
    // BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";

import { Button, Layout, Menu } from 'antd';
import { BarsOutlined, UserOutlined, AuditOutlined } from '@ant-design/icons';
import { LOCATION_PAGE, BOOKING_PAGE, NOTIFICATION_PAGE, ACCOUNT_PAGE } from '../../common/constant';
import { accountAPI } from '../../api/account';



const { Header, Content, Footer, Sider } = Layout;

export const DashboardLayout = ({ content }) => {
    // const [account, setAccount] = useState({})

    useEffect(() => {
        accountAPI.getOwn().then(response => {
            console.log(response)
            // setAccount(response)
        })
    }, [])

    const onLogOut = () => {
        localStorage.removeItem("token")
        window.location.href = "/login"
    }



    return (
        <Layout>
            <Sider breakpoint="lg" collapsedWidth="0" onCollapse={(collapsed, type) => { console.log(collapsed, type) }}>
                <div className="logo" />
                <Menu theme="dark" mode="inline">
                    <Menu.Item key="2" icon={<AuditOutlined />}>
                        <Link to={LOCATION_PAGE}>Vị trí</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UserOutlined />}>
                        <Link to={BOOKING_PAGE}>Chuyến đi</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<BarsOutlined />}>
                        <Link to={NOTIFICATION_PAGE}>Thông báo</Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<BarsOutlined />}>
                        <Link to={ACCOUNT_PAGE}>Tài khoản</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
                    <Button danger onClick={onLogOut}>Đăng xuất</Button>
                </Header>
                <Content style={{ margin: '24px 16px 0', padding: 24, minHeight: 670 }}>
                    <Layout.Content style={{ margin: "0 16px" }}>
                        {(content)}
                    </Layout.Content>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
}
