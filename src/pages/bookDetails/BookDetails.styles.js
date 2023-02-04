import { styled } from '@mui/material';


export const Container = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center'
}));

export const MainBanner = styled('div')(({image}) =>({
    width: "100%",
    height: 400,
    backgroundImage: `url(${image})`,
    display: 'table'
}));

export const TitleBook = styled('h1')(() => ({
    color: "white",
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center',
    height: '300'
}));

export const BookResume = styled('p')(() => ({
    color: 'white',
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center'
}))

export const BookDescription = styled('h3')(({ theme }) => ({
    color: 'black',
    fontWeight: '400',
    borderBottom: 'grove',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
}));
