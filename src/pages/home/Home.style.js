import { styled,Grid} from '@mui/material';

export const MainBanner = styled(Grid)(({image, theme}) =>({
    width: "100%",
    height: 500,
    backgroundImage: `url(${image})`,
    justifyContent: "center",
    marginBottom: "15px",
    display: 'flex',
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
        minWidth:"70%",
        minHeight:"100%"
    },
    ".subscribe":{
        width:"30%",
        marginLeft: "10%",
        marginTop: "5%"
    },
    ".paper":{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        fontWeight: 600
    },
    ".button":{
        backgroundColor: theme.palette.primary.contrastText,
        color: theme.palette.primary.main,
        marginLeft: "5%",
        minWidth:"35%"
    }
}));

export const NewsCards = styled(Grid)(() =>({
    ".avatar":{
        minWidth: "100%",
        minHeight:"100%"
    },
    ".nameBook":{
        fontSize: "25px",
        marginBottom: "4px"
    },
    ".authorBook":{
        fontSize: "18px"
    },
    ".synopsisBook":{
        fontSize: "20px"
    }
}));

export const MainContent = styled(Grid)(()=>({
    minWidth: "80%",
    maxWidth:"80%"
}))

export const Beloved = styled(Grid)(()=>({
    marginTop: "15px",
    marginBottom: "20px",
    marginLeft:"10px",
    ".avatarBeloved":{
        minWidth: "100%",
        minHeight:"100%"
    }
}))

export const GridBeloved = styled(Grid)(() => ({
    ':hover': {
        cursor: 'pointer',
        transform: 'scale(1.05)'
    }
}))
