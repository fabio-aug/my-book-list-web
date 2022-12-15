import React, { useState } from "react";

function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setToken = (token) => {
    };

    const getToken = () => {
    };

    const signIn = (token) => {
    };

    const signOut = () => {
    };

    return {
        isAuthenticated,
        setToken,
        getToken,
        signIn,
        signOut,
    };
}

export default useAuth;