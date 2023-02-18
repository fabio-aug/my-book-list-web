import { styled } from '@mui/system';
import { Toolbar } from '@mui/material';

export const Header = styled(Toolbar)(() => ({
    width: '100%',
    borderBottom: 1,
    display: 'flex',
    borderColor: 'divider',
    justifyContent: 'space-between',

    '.box-itens': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    '.title': {
        paddingLeft: 10,
        fontFamily: 'Varela'
    },

    '.avatar': {
        width: 50,
        height: 50, 
    }
}));
