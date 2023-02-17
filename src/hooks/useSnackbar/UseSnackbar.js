import React, { useContext, useMemo } from 'react';
import Alert from '@mui/material/Alert';
import { SnackbarContext } from 'providers/snackbar/SnackbarProvider';

const severities = {
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error'
};

function useSnackbar({
    variant = 'filled',
    vertical = 'bottom',
    horizontal = 'center',
    autoHideDuration = 2500
} = {}) {
    const { open, close } = useContext(SnackbarContext);

    const snackbarData = useMemo(() => ({
        anchorOrigin: { vertical, horizontal },
        autoHideDuration
    }), [vertical, horizontal, autoHideDuration]);

    const snackbar = (message) => ({
        success: () => open(
            <Alert variant={variant} severity={severities.SUCCESS} onClose={close}>
                {message}
            </Alert>,
            snackbarData
        ),
        warning: () => open(
            <Alert variant={variant} severity={severities.WARNING} onClose={close}>
                {message}
            </Alert>,
            snackbarData
        ),
        info: () => open(
            <Alert variant={variant} severity={severities.INFO} onClose={close}>
                {message}
            </Alert>,
            snackbarData
        ),
        error: () => open(
            <Alert variant={variant} severity={severities.ERROR} onClose={close}>
                {message}
            </Alert>,
            snackbarData
        ),
    });

    return snackbar;
}

export default useSnackbar;
