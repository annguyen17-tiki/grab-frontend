import React from 'react';
import { DashboardLayout } from '../../components/layout';
import { ListingNotificationContainer } from '../../containers/ListingNotification';


export const NotificationPage = () => {
    return (
        <DashboardLayout
            content={<ListingNotificationContainer />}
            selectedKey='notification_page'
        />
    )
}