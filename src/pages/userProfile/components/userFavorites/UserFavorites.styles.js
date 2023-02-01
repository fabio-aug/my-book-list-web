import { styled } from '@mui/system';
import { Grid } from '@mui/material';

export const Wrapper = styled(Grid)(() => ({
    '.user-image': {
        height: '300px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        margin: 5
    }
}));
