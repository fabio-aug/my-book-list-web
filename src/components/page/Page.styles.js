import { styled } from '@mui/system';

export const Wrapper = styled('div')(({ isFullWidth, isFullHeight }) => ({
    width: '100%',
    display: 'flex',
    marginTop: isFullHeight,
    marginBottom: '40px',
    justifyContent: 'center',

    '.box': {
        maxWidth: isFullWidth,
        minWidth: isFullWidth,
        width: isFullWidth,
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    }
}));
