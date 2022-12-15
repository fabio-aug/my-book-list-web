import React from 'react';
import {
    Route,
    Navigate,
    BrowserRouter,
    Routes as AppRoutes
} from 'react-router-dom';

import {
    Home
} from '../pages';

function Routes() {
    return (
        <BrowserRouter>
            <AppRoutes>
                <Route path="/home" element={<Home />} />

                <Route path="*" element={<Navigate to="/home" />} />
                <Route path="/" element={<Navigate to="/home" />} />
            </AppRoutes>
        </BrowserRouter>
    )
}

export default Routes;