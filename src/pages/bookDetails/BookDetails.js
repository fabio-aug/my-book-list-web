import React, { useState, useEffect } from 'react';
import { BookResume, MainBanner, TitleBook, BookDescription } from './BookDetails.styles';
import { useParams } from 'react-router-dom';

import {
    Grid,
    Box,
    Typography,
} from '@mui/material';

import { Page, Divider, SkeletonCard, BookCard  } from 'components';
import { useSnackbar } from 'hooks';
import { Image } from 'assets';

import { BookRequests } from 'services';
import { ReviewRequests } from 'services';
import { Photo } from '@mui/icons-material';



function BookDetails() {

    const [mostReviewedList, setMostReviewedList] = useState([]);
    const [loadingMostReviewed, setLoadingMostReviewed] = useState(false);

    // bookDetails
    const snackbar = useSnackbar();
    const { idBook } = useParams();
    const [bookData, setBookData] = useState(null);

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

    

    // review
    //const [bookReviews, setBookReviews] = useState([]);
    //const [loading, setLoading] = useState(false);

    function getLastReviews() {
        if (loadingMostReviewed) return;
        setLoadingMostReviewed(true);
        ReviewRequests.getLastReviews().then((res) => {
            if (res.status) {
                setMostReviewedList(res.data.bookList);
            }
        }).catch((error) => {
            snackbar('Erro ao buscar livro.').error();
        }).finally(() => setLoadingMostReviewed(false));
    }




    return (
        <Page title='detalhes-do-livro' isFullHeight isFullWidth>
            <Grid 
                item sm={12} md={12} lg={12}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="baseline"
            >
            <Grid item md={4} alignItems="center">
            <MainBanner image={bookData.photo}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid item xs={12} container spacing={0} direction="column" justifyContent="flex-end" alignItems="center">
                        <TitleBook alignItems="center">
                            <Typography variant="h1" component="h2" >
                                {bookData.name}
                            </Typography>
                        </TitleBook>
                    </Grid>
                </Box>

            
            </MainBanner>
            </Grid>

            <Grid item md={8} justifyContent="flex-start" alignItems="baseline">
            <Grid container spacing={2} columns={12}>
                <Grid item xs={2}>
                    <BookDescription >
                        {bookData.author}
                    </BookDescription>
                    <BookDescription >
                        {bookData.dateOfPublication}
                    </BookDescription>
                    <BookDescription >
                        {bookData.publisher}
                    </BookDescription>
                    <BookDescription >
                        {bookData.synopsis}
                    </BookDescription>
                </Grid>
            </Grid>
            </Grid>

            </Grid>

            <Grid item sm={12} md={12} lg={12}>
                <Divider title='Últimas reviews' />
                {(!loadingMostReviewed && mostReviewedList.length !== 0) && (
                    <Grid item sm={12} md={12} lg={12} >
                        <Grid container spacing={2}>
                            {mostReviewedList.map((review, index) => (
                                <Grid item sm={12} md={12} lg={12} key={index}>
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