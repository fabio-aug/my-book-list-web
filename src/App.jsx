import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { BrowserRouter as RoutesProvider } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Routes from "routes/Routes";
import { SnackbarProvider, ThemeProvider, GlobalProvider } from 'providers';

function App() {
    return (
        <GlobalProvider>
            <ThemeProvider>
                <SnackbarProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <RoutesProvider>
                            <Routes />
                        </RoutesProvider>
                    </LocalizationProvider>
                </SnackbarProvider>
            </ThemeProvider>
        </GlobalProvider>
    );
}

export default App;