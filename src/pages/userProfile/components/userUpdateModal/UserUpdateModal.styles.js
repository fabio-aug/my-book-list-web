import { styled } from "@mui/system";
import { Modal as ModalMUI } from '@mui/material';

export const Modal = styled(ModalMUI)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '.paper': {
        maxWidth: '500px',
        maxHeight: '85%',
        padding: 40,
        overflow: 'auto',
        [theme.breakpoints.down('md')]: {
            maxWidth: '85%',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '95%',
        },
    }
}));
