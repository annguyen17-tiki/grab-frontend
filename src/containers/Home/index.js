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



export const HomeContainer = () => {
    return (
        'Hello Home Container'
    )
}