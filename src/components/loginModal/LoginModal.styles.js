import { styled } from "@mui/system";
import { Modal as ModalMUI } from '@mui/material';

export const Modal = styled(ModalMUI)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '.paper': {
        maxWidth: '500px',
        padding: 40,
        overflow: 'auto',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '95%',
        },
    }
}));
