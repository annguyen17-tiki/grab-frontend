import React from 'react';
import { DashboardLayout } from '../../components/layout';
import { ListingBookingContainer } from '../../containers/ListingBooking';


export const BookingPage = () => {
    return (
        <DashboardLayout
            content={<ListingBookingContainer />}
            selectedKey='booking_page'
        />
    )
}