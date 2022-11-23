import React from 'react';
import { DashboardLayout } from '../../components/layout';
import { AccountSettingContainer } from '../../containers/AccountSetting'


export const AccountPage = () => {
    return <DashboardLayout
        content={< AccountSettingContainer />}
        selectedKey='account_page'
    />
}