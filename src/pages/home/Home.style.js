import {styled,Grid} from '@mui/material';

export const MainBanner = styled(Grid)(({image, theme}) =>({
    width: "100%",
    height: 500,
    backgroundImage: `url(${image})`,
    justifyContent: "center",
    marginBottom: "15px",
    display: 'flex',
    alignContent: "center",
    ".maintitle":{
        color: theme.palette.primary.contrastText,
        letterSpacing: "2px",
        fontSize: "80px",
        fontWeight: "100px",
        textAlign: 'center'
    },
    ".subtitle":{
        color: theme.palette.secondary.main,
        fontSize: "30px",
        textAlign: 'center'
    }
}));

export const NewsCards = styled(Grid)(({theme}) =>({
    ".avatar":{
        minWidth: '100%', 
        minHeight: '100%',
/*         [theme.breakpoints.down('md')]: {
            minWidth: '275px',
            minHeight: '275px'
        } */
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

export const Beloved = styled(Grid)(({theme})=>({
    marginTop: "15px",
    marginBottom: "20px",
    marginLeft:"10px",
    ".avatarBeloved":{
        minWidth: "100%",
        minHeight:"100%",
         [theme.breakpoints.down('md')]: {
            minWidth: '100%',
            minHeight: '200px'
        } 
    }
}))

export const GridBeloved = styled(Grid)(() => ({
    ':hover': {
        cursor: 'pointer',
        transform: 'scale(1.05)'
    }
}))

export const SubGrid = styled(Grid)(({theme}) => ({
    width: '100%', 
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    display: 'flex',
    marginTop: "50px",
    fontSize: "20px",
    ".paper":{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: theme.palette.primary.contrastText,
        borderRadius: '5px',
        textAlign: 'center',
        fontWeight: 600,
        marginLeft: '10px'
    },
    ".button":{
        marginLeft: '10px',
        backgroundColor: theme.palette.primary.contrastText,
        color: theme.palette.primary.main,
        fontWeight: 600
    }

}))
