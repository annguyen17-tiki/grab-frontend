import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './page/home/index';
import { LoginPage } from './page/account/login';
import { LANDING_PAGE, LOGIN_PAGE, ACCOUNT_PAGE, LOCATION_PAGE, BOOKING_PAGE, NOTIFICATION_PAGE } from './common/constant';
import { LocationPage } from './page/location/index';
import { AccountPage } from './page/account/index';
import { NotificationPage } from './page/notification/index';
import { BookingPage } from './page/booking/index';
import { DetailBookingPage } from './page/booking/[id]/index';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={LANDING_PAGE} element={<LandingPage />} exact />
                <Route path={ACCOUNT_PAGE} element={<AccountPage />} />
                <Route path={LOCATION_PAGE} element={<LocationPage />} />
                <Route path={BOOKING_PAGE} element={<BookingPage />} />
                <Route path={`${BOOKING_PAGE}/:id`} element={<DetailBookingPage />} />
                <Route path={NOTIFICATION_PAGE} element={<NotificationPage />} />
                <Route path={LOGIN_PAGE} element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
