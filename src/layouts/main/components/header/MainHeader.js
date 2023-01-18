import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

function MainHeader() {
    return (
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Button size='small'>Subscribe</Button>
            <Typography
                component='h2'
                variant='h5'
                color='inherit'
                align='center'
                noWrap
                sx={{ flex: 1 }}
            >
                My Book List
            </Typography>
            <IconButton>
                <SearchIcon />
            </IconButton>
            <Button variant='outlined' size='small'>
                Sign up
            </Button>
        </Toolbar>
    );
}

export default MainHeader;
