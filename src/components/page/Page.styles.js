import { styled } from '@mui/system';

export const Wrapper = styled('div')(({ isFullWidth, isFullHeight }) => ({
    width: '100%',
    display: 'flex',
    marginTop: isFullHeight,
    marginBottom: isFullHeight,
    justifyContent: 'center',

    '.box': {
        maxWidth: isFullWidth,
        minWidth: isFullWidth,
        width: isFullWidth,
    }
}));
