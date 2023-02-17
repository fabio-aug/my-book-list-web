import { useContext } from 'react';
import { GlobalContext } from 'providers/global/GlobalProvider';

function useAuth() {
    const {
        setCurrentUser,
        getCurrentUser,
        removeCurrentUser,
        isAuthenticated
    } = useContext(GlobalContext);

    function signIn(userData) {
        setCurrentUser(userData);
    }

    function setUser(userData) {
        setCurrentUser(userData);
    }

    function getUser() {
        return getCurrentUser();
    }

    function signOut() {
        removeCurrentUser();
    }

    return {
        signIn,
        setUser,
        getUser,
        signOut,
        isAuthenticated
    };
}

export default useAuth;
