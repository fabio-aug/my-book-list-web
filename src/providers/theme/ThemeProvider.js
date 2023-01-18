import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import { responsiveFontSizes } from '@mui/material';
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { createTheme, ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';

import shadows from './Shadows';
import palette from './Palettes';
import typography from './Typography';
import StylesGlobal from './StylesGlobal';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const theme = responsiveFontSizes(
        createTheme({
            palette,
            shadows,
            typography
        }));

    return (
        <MaterialThemeProvider theme={theme}>
            <EmotionThemeProvider theme={theme}>
                <ThemeContext.Provider value={{ theme }}>
                    <CssBaseline />
                    <StylesGlobal />
                    {children}
                </ThemeContext.Provider>
            </EmotionThemeProvider>
        </MaterialThemeProvider>
    );
}

function useThemeState() {
    return useContext(ThemeContext);
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { ThemeProvider, ThemeContext, useThemeState };