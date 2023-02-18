import React, { useState, useEffect } from 'react';
import { BookResume, MainBanner, TitleBook, BookDescription } from './BookDetails.styles';

import {
    Grid,
    Box,
    Typography,
} from '@mui/material';

import { Page, Divider } from 'components';
import { Image } from 'assets';

function BookDetails() {

    return (
        <Page title='detalhes-do-livro' isFullHeight isFullWidth>
            <MainBanner image={Image.Estante}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0} direction="column" justifyContent="flex-end" alignItems="center">
                        <Grid item xs={12} >
                            <TitleBook >
                                <Typography variant="h1" component="h2"   >
                                    Nome do Livro
                                </Typography>
                            </TitleBook>
                            <Grid item xs={12}></Grid>
                            <BookResume>
                                texto sdfasdfasdfasfdv a fsgfh dghdfr sggsd
                            </BookResume>
                        </Grid>
                    </Grid>
                </Box>
            </MainBanner>
            <Grid container spacing={2} columns={16}>
                <Grid item xs={2}>
                    <BookDescription >
                        Autor
                    </BookDescription>
                    <BookDescription >
                        Data da publicação
                    </BookDescription>
                    <BookDescription >
                        Editora
                    </BookDescription>
                </Grid>
                <Grid item xs={10}>
                    <BookDescription>texto</BookDescription>
                </Grid>
            </Grid>
            <Grid item sm={12} md={12} lg={12}>
                    <Divider title='Últimas reviews' />
                </Grid>
        </Page>
    );
}

export default BookDetails;