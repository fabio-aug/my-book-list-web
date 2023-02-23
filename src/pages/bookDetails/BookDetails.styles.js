import { styled } from '@mui/material';

export const MainBanner = styled('div')(({image}) =>({
    width: "300px",
    height: "300px",
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
}));

export const TitleBook = styled('h1')(() => ({
    color: "black",
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: '100',
}));

export const BookDescription = styled('h3')(({ theme }) => ({
    color: 'black',
    fontWeight: '400',
    borderBottom: 'grove',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
}));
