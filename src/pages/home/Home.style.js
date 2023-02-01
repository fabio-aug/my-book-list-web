import { styled,Grid } from '@mui/material';

export const MainBanner = styled(Grid)(({image, theme}) =>({
    width: "100%",
    height: 500,
    backgroundImage: `url(${image})`,
    justifyContent: "center",
    ".maintitle":{
        color: theme.palette.primary.contrastText,
        letterSpacing: "2px",
        fontSize: "80px",
        fontWeight: "100px"
    },
    ".subtitle":{
        color: theme.palette.secondary.main,
        fontSize: "30px"
    },
    ".newImage":{
        minWidth:"100%",
        minHeight:500
    }
}));

export const NewsCards = styled(Grid)(() =>({
    maxWidth: "80%",
    ".avatar":{
        minWidth: "100%",
        minHeight:"100%"
    }
}));
