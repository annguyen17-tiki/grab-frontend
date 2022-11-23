import React from 'react';
import { DetailBookingContainer } from '../../../containers/DetailBooking';
import { DashboardLayout } from '../../../components/layout';


export const DetailBookingPage = () => {
    return (
        <DashboardLayout
            content={<DetailBookingContainer />}
            selectedKey='booking_page'
        />
    )
}