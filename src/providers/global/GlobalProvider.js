import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

import { useLocalStorage } from 'hooks';

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);
    const currentUser = useLocalStorage('currentUser');

    function getCurrentUser() {
        return currentUser.value;
    }

    function setCurrentUser(user) {
        currentUser.setValue(user);
    }

    function removeCurrentUser() {
        currentUser.remove();
    }

    function switchModal() {
        setLogin(!login);
        setRegister(!register);
    }

    const sharedValue = {
        // Login Modal
        login,
        setLogin,

        // Register Modal
        register,
        setRegister,

        // Switch Register Modal and Login Modal
        switchModal,

        // User
        setCurrentUser,
        getCurrentUser,
        removeCurrentUser,
        isAuthenticated: !!currentUser.value
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
