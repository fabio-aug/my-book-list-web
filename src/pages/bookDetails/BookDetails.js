import React, { useState, useEffect } from 'react';
import { MainBanner, TitleBook, BookDescription  } from './BookDetails.styles';
import { useParams } from 'react-router-dom';

import {
    Grid,
    Box,
    Typography,
} from '@mui/material';

import { Page, Divider, BookCard } from 'components';
import { useSnackbar } from 'hooks';
import { BookRequests , ReviewRequests } from 'services';

function BookDetails() {

    const snackbar = useSnackbar();
    const { idBook } = useParams();
    const [bookData, setBookData] = useState(null);

    const [LastReviewsList, setLastReviewsList] = useState([]);
    const [loadingLastReviews, setLoadingLastReviews] = useState(false);


    useEffect(() => {
        GetBookById();
    }, [idBook]);

    function componentDidMount() {
        getLastReviews();
    }
    useEffect(componentDidMount, []);

    function GetBookById() {
        BookRequests.GetBookById(idBook).then((res) => {
            if (res) {
                setBookData(res);
            } else {
                snackbar('Não foi possível encontrar o livro.').warning();
            }
        }).catch((error) => {
            snackbar('Erro ao buscar livro.').error();
        })
    }
    if (!bookData) {
        return <p>Carregando...</p>
    }

    function getLastReviews() {
        if (loadingLastReviews) return;
        setLoadingLastReviews(true);
        ReviewRequests.getLastReviews().then((res) => {
            if (res.status) {
                setLastReviewsList(res.data.bookList);
            }
        }).catch((error) => {
            snackbar('Erro ao buscar livro.').error();
        }).finally(() => setLoadingLastReviews(false));
    }

    return (
        <Page title='detalhes-do-livro' isFullHeight isFullWidth>
            <Grid container item sm={12} md={12} lg={12} >
                <Grid item md={4} alignItems="center">
                    <MainBanner image={bookData.photo}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid item xs={12} container spacing={0} direction="column" justifyContent="flex-end" alignItems="center">
                                <TitleBook alignItems="center">
                                    <Typography variant="h1" component="h2" >
                                        {bookData.name}
                                    </Typography>
                                </TitleBook>
                                <BookDescription >
                                    {bookData.author}
                                </BookDescription>
                                <BookDescription >
                                    {bookData.dateOfPublication}
                                </BookDescription>
                                <BookDescription >
                                    {bookData.publisher}
                                </BookDescription>
                            </Grid>
                        </Box>
                    </MainBanner>
                </Grid>
                <Grid item md={6} justifyContent="flex-start" alignItems="center">
                    <BookDescription >
                        {bookData.synopsis}
                    </BookDescription>
                </Grid>
            </Grid>

            <Grid item sm={12} md={12} lg={12}>
                <Divider title='Últimas reviews'/>
            </Grid>

            <Grid container item sm={12} md={12} lg={12}>
                {(!loadingLastReviews && LastReviewsList.length !== 0) && (
                    <Grid item sm={12} md={12} lg={12} >
                        <Grid container spacing={2}>
                            {LastReviewsList.map((review, index) => (
                                <Grid item sm={4} md={4} lg={4} key={index} >
                                    <BookCard book={review.Book} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Page>
    );
}

export default BookDetails;