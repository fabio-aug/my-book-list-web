import { WidthFull } from '@mui/icons-material';
import { styled } from '@mui/material';


export const Container = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center'
}));

export const MainBanner = styled('div')(({image}) =>({
    width: "100%",
    height: 700,
    backgroundImage: `url(${image})`
}));

export const MainTitle = styled('h1')(() => ({
    color: "#FFFFFF",
    height: 200,
    justifyContent: 'center'
}));
