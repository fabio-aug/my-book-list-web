import { styled } from '@mui/system';
import { Grid } from '@mui/material';

export const PagesContainer = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'center',
}));

export const MainBanner = styled('div')(({image}) =>({
    width: "80%",
    height: 400,
    backgroundImage: `url(${image})`
}));
