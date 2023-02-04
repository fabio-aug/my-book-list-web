import { styled } from '@mui/system';
import { Grid } from '@mui/material';

export const Wrapper = styled(Grid)(() => ({
    '.pagination': {
        display: 'flex',
        justifyContent: 'center',
    },

    '.card': {
        height: '100px',
        display: 'flex',
        
        ':hover': {
            cursor: 'pointer',
            transform: 'scale(1.05)'
        },

        '.image': {
            width: '40%',
            height: '100%',
            maxWidth: '40%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        },

        '.skeleton-content': {
            width: '100%',
        }
    }
}));
