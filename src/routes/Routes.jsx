import React from 'react';
import {
    Route,
    Navigate,
    BrowserRouter,
    Routes as AppRoutes
} from 'react-router-dom';

import { MainLayout } from '../layout';

import {
    Home
} from '../pages';

function Routes() {
    return (
        <BrowserRouter>
            <AppRoutes>
                <Route path="/" element={<MainLayout />} >
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Navigate to="/home" />} />
                </Route>

                <Route path="*" element={<Navigate to="/" />} />
            </AppRoutes>
        </BrowserRouter>
    );
}

export default Routes;