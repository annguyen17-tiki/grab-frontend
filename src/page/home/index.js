import React from 'react';
import { DashboardLayout } from '../../components/layout';
import { HomeContainer } from '../../containers/Home';


export const LandingPage = () => {
    return (
        <DashboardLayout
            content={<HomeContainer />}
            selectedKey='landing_page'
        />
    )
}