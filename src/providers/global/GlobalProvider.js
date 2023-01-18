import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const GlobalContext = createContext();

function GlobalProvider({ children }) {

    const [exemple, setExemple] = useState(false);

    const sharedValue = {
        exemple,
        setExemple
    }

    return (
        <GlobalContext.Provider value={sharedValue}>
            {children}
        </GlobalContext.Provider>
    )
}

GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { GlobalProvider, GlobalContext };