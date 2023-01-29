import { styled } from '@mui/system';
import { Grid } from '@mui/material';

export const Wrapper = styled(Grid)(() => ({
    '.user-image': {
        width: '100%',
        maxHeight: '200px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    }
}));
