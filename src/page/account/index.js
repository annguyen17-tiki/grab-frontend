import React, { useEffect } from 'react';
import {
    // BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";

import { Button, Layout, Menu } from 'antd';
import { BarsOutlined, UserOutlined, AuditOutlined } from '@ant-design/icons';
// import { MedicationTable } from '../medication/list'
// import { PatientTable } from '../patient/list';
// import { PatientsByDoctorTable } from '../treatment/patient_by_doctor'
// import { TreatmentHistory } from '../treatment/treatment_history';
import { LOCATION_PAGE, BOOKING_PAGE, NOTIFICATION_PAGE, ACCOUNT_PAGE } from '../../common/constant';
import { accountAPI } from '../../api/account';
import { SaveLocationForm } from '../location';
import { DashboardLayout } from '../../components/layout';
import { AccountSettingContainer } from '../../containers/AccountSetting'
import { SaveLocationContainer } from '../../containers/SaveLocation';
// import { formatDoctorName, formatDoctorTitle } from '../../common/helper';


const { Header, Content, Footer, Sider } = Layout;
export const AccountPage = () => {
    return (
        <DashboardLayout content={< AccountSettingContainer />} />
    )
}