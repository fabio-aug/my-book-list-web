import React from 'react';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Typography, Avatar, Box, IconButton, useMediaQuery } from '@mui/material';

import { Header } from './MainHeader.styles';
import { Mobile, Desktop } from './components';

function MainHeader() {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Header>
            <Box className='box-itens'>
                <IconButton>
                    <Avatar
                        className='avatar'
                        alt='my-book-list-icon'
                        sx={{ bgcolor: "primary.main" }}
                    >
                        <AutoStoriesIcon />
                    </Avatar>
                </IconButton>
                <Typography
                    variant='h2'
                    align='center'
                    color='inherit'
                    className='title'
                >
                    My Book List
                </Typography>
            </Box>

            <Box className='box-itens'>
                {isMobile ? (
                    <Mobile />
                ) : (
                    <Desktop />
                )}
            </Box>
        </Header>
    );
}

export default MainHeader;
