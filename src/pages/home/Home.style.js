import { styled } from '@mui/material';

export const MainBanner = styled('div')(({image}) =>({
    width: "100%",
    height: 500,
    backgroundImage: `url(${image})`
}));

export const MainTitle = styled('h1')(() => ({
    color: "#FFFFFF",
    height: 200,
    justifyItems: 'center'
}));

export const SubTitle = styled('h3')(() => ({
    color: "#FFFFFF",
    height: 200,
    justifyContent: 'center'
}));

export const NewsCards = styled('card')(() =>({
    maxWidth: "50%",
    maxHeight: 395
}));