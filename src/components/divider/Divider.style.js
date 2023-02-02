import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const Wrapper = styled(Box)(() => ({
    width: '100%',

    '.box': {
        minWidth: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    }
}));
