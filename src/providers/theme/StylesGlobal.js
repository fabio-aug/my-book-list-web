import { colors, GlobalStyles } from '@mui/material';

function StylesGlobal() {
    return (
        <GlobalStyles styles={(theme) => {
            return {
                '*': {
                    boxSizing: 'border-box',
                    margin: 0,
                    padding: 0,
                },
                '&::-webkit-scrollbar': {
                    height: theme.spacing(0.5),
                    width: theme.spacing(0.5)
                },
                '&::-webkit-scrollbar-track': {
                    background: colors.grey[300]
                },
                '&::-webkit-scrollbar-thumb': {
                    background: colors.grey[600],
                    '&:hover': {
                        background: colors.grey[800]
                    }
                },
                html: {
                    '&-webkit-font-smoothing': 'antialiased',
                    '&-moz-osx-font-smoothing': 'grayscale',
                    height: '100%',
                    width: '100%'
                },
                body: {
                    backgroundColor: theme.palette.background.default,
                    height: '100%',
                    width: '100%',
                },
                '#root': {
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%'
                },
                a: {
                    textDecoration: 'none'
                },
                'main': {
                    flex: 1,
                },
            }
        }}/>
    );
}

export default StylesGlobal;
