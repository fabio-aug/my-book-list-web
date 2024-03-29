import React from 'react';
import { BrowserRouter as RoutesProvider } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Routes from 'routes/Routes';
import { LoginModal, RegisterModal } from 'components';
import { SnackbarProvider, ThemeProvider, GlobalProvider } from 'providers';

function App() {
    return (
        <GlobalProvider>
            <ThemeProvider>
                <SnackbarProvider>
                    <RoutesProvider>
                        <Routes />
                    </RoutesProvider>
                    <LoginModal />
                    <RegisterModal />
                </SnackbarProvider>
            </ThemeProvider>
        </GlobalProvider>
    );
}

export default App;
