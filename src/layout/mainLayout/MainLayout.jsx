import React from 'react';
import { Outlet } from 'react-router-dom';

function MainLayout() {
    return (
        <React.Fragment>
            <div> HEADER </div>
            <div> <Outlet /> </div>
            <div> FOOTER </div>
        </React.Fragment>
    );
}

export default MainLayout;