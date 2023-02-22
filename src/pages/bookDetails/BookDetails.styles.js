import { styled } from '@mui/material';


export const Container = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center'
}));

export const MainBanner = styled('div')(({image}) =>({
    width: "300px",
    height: "300px",
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
}));

export const TitleBook = styled('h1')(() => ({
    color: "red",
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: '100',
}));

export const BookResume = styled('p')(() => ({
    color: 'red',
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
