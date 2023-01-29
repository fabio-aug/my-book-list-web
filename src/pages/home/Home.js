import React, { useState } from 'react';
import { Image } from 'assets';
import { useSnackbar } from 'hooks';
import { Page, Modal } from 'components';
import { Container, MainBanner, MainTitle } from './Home.style';
import '@fontsource/roboto/700.css';
import {
    Grid,
    Button,
    Pagination,
    IconButton,
    Typography,
    OutlinedInput,
    InputAdornment
} from '@mui/material';

function Home() {
    const snackbar = useSnackbar();
    const [modalStatus, setModalStatus] = useState(false);
    return (
        <Page title='Home' isFullHeight isFullWidth>
            <MainBanner image={Image.Estante}>
                <MainTitle>
                    <Typography variant="h1" component="h2">
                        Bem-vindo ao MyBookList
                    </Typography>
                </MainTitle>
            </MainBanner>
        </Page>
    )
}

export default Home;
