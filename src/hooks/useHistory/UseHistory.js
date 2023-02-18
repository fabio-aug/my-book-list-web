import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAuth, useLocalStorage } from 'hooks';
import { GlobalContext } from 'providers/global/GlobalProvider';

function useHistory() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    const lastUrl = useLocalStorage('lastUrl');
    const { setLogin } = useContext(GlobalContext);

    function redirectTo(redirectRoute) {
        if (redirectRoute !== '/home' && !isAuthenticated) {
            setLogin(true);
        } else {
            lastUrl.setValue(location.pathname);
            navigate(redirectRoute);
        }
    }

    function getRouteBack() {
        navigate(lastUrl.value || '');
    }

    return {
        redirectTo,
        getRouteBack,
    };
}

export default useHistory;
