import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Col, Layout, Menu, notification, Row, Typography } from 'antd';
import { CarOutlined, UserOutlined, ScheduleOutlined, PushpinOutlined, MessageOutlined } from '@ant-design/icons';
import { LOCATION_PAGE, BOOKING_PAGE, NOTIFICATION_PAGE, ACCOUNT_PAGE, LANDING_PAGE } from '../../common/constant';
import { accountAPI } from '../../api/account';
import { formatAccountName, formatRole } from '../../common/helper'
const { Text } = Typography;


const { Header, Content, Footer, Sider } = Layout;

export const DashboardLayout = ({ content, selectedKey }) => {
    const [account, setAccount] = useState({})

    useEffect(() => {
        accountAPI.getOwn()
            .then(response => setAccount(response))
            .catch(() => notification.error({ message: 'Có lỗi xảy ra' }))
    }, [])

    const onLogOut = () => {
        localStorage.removeItem("token")
        window.location.href = "/login"
    }

    return (
        <Layout >
            <Sider trigger={null} collapsible>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[selectedKey]}
                >
                    {account.role === 'user' &&
                        <Menu.Item key='landing_page' icon={<CarOutlined />}>
                            <Link to={LANDING_PAGE}>Đặt xe</Link>
                        </Menu.Item>
                    }
                    {account.role === 'driver' &&
                        <Menu.Item key='location_page' icon={<PushpinOutlined />}>
                            <Link to={LOCATION_PAGE}>Vị trí</Link>
                        </Menu.Item>
                    }
                    <Menu.Item key='booking_page' icon={<ScheduleOutlined />}>
                        <Link to={BOOKING_PAGE}>Chuyến đi</Link>
                    </Menu.Item>
                    <Menu.Item key='notification_page' icon={<MessageOutlined />}>
                        <Link to={NOTIFICATION_PAGE}>Thông báo</Link>
                    </Menu.Item>
                    <Menu.Item key='account_page' icon={<UserOutlined />}>
                        <Link to={ACCOUNT_PAGE}>Tài khoản</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <Row>
                        <Col span={21} >
                            <Text strong style={{ padding: 24 }}>
                                {`${formatRole(account.role)}: ${formatAccountName(account)}`}
                            </Text>
                        </Col>
                        <Col span={3}>
                            <Button type='primary' danger onClick={onLogOut}>
                                <strong>Đăng xuất</strong>
                            </Button>
                        </Col>
                    </Row>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{ margin: '24px 24px', padding: 24, minHeight: 670 }}
                >
                    <Layout.Content style={{ margin: "0 16px" }}>
                        {(content)}
                    </Layout.Content>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout >
    )
}
