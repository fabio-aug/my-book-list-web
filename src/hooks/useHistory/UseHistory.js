import { useNavigate, useLocation } from 'react-router-dom';
import useLocalStorage from 'hooks/useLocalStorage/UseLocalStorage';

function useHistory() {
    const navigate = useNavigate();
    const location = useLocation();
    const lastUrl = useLocalStorage('lastUrl');

    function redirectTo(redirectRoute) {
        lastUrl.setValue(location.pathname);
        navigate(redirectRoute);
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
