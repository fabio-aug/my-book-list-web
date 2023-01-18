import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

import { MainLayout } from 'layouts';

import { Home } from 'pages';

function Routes() {
    const routes = useRoutes([
        {
            element: <MainLayout />,
            children: [
                { path: '/home', element: <Home /> },
            ]
        },

        { path: '/', element: <Navigate to='/home' /> },
        { path: '*', element: <Navigate to='/home' /> },
    ]);

    return routes;
}

export default Routes;
