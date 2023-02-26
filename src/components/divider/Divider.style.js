import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const Wrapper = styled(Box)(() => ({
    width: '100%',

    '.box-divider': {
        minWidth: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
}));
