import React, { useState, createContext } from 'react';

export const GlobalContext = createContext(null);

function Global({children}) {
    const [exemple, setExemple] = useState('value');

    const sharedValues = {
        exemple,
        setExemple
    }

    return (
        <GlobalContext.Provider value={sharedValues}>
            {children}
        </GlobalContext.Provider>
    );
}

export default Global;