import { styled } from '@mui/system';
import { Grid } from '@mui/material';

export const ImagePicker = styled(Grid)(({ theme, size }) => ({
    '.input': {
        display: "none!important"
    },
    '.image': {
        [theme.breakpoints.up("md")]: {
            width: size,
            height: size,
        },
        [theme.breakpoints.down("md")]: {
            width: size / 2,
            height: size / 2,
        },
        borderRadius: '2px'
    },
    '.frame': {
        padding: '2px',
        borderRadius: '2px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
    },
    '.removeButton': {
        borderColor: '#c10016',
        backgroundColor: '#c10016',
        color: '#fff',
        "&:hover": {
            backgroundColor: 'rgba(193, 0, 22, 0.8)',
        },
    },
    '.errorText': {
        color: '#c10016',
    }
}));
