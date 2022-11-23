import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/layout';
import { SaveLocationContainer } from '../../containers/SaveLocation';
import { accountAPI } from '../../api/account';


export const LocationPage = () => {
    const [account, setAccount] = useState({})

    useEffect(() => {
        accountAPI.getOwn().then(account => setAccount(account))
    }, [])

    if (account.role !== 'driver') {
        return <DashboardLayout content={'Tài khoản không phải Tài Xế'} />

    }

    return <DashboardLayout
        content={<SaveLocationContainer />}
        selectedKey='location_page'
    />

}