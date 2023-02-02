import { styled,Grid } from '@mui/material';

export const MainBanner = styled(Grid)(({image, theme}) =>({
    width: "100%",
    height: 500,
    backgroundImage: `url(${image})`,
    justifyContent: "center",
    marginBottom: "50px",
    ".maintitle":{
        marginLeft: "10%",
        color: theme.palette.primary.contrastText,
        letterSpacing: "2px",
        fontSize: "80px",
        fontWeight: "100px"
    },
    ".subtitle":{
        marginLeft: "10%",
        color: theme.palette.secondary.main,
        fontSize: "30px"
    },
    ".newImage":{
        minWidth:"60%",
        minHeight:500
    }
}));

export const NewsCards = styled(Grid)(() =>({
    margin: "50px",
    maxWidth: "80%",
    ".avatar":{
        minWidth: "100%",
        minHeight:"100%"
    }
}));
