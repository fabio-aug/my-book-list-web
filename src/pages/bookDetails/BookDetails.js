import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import React, { useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { Grid, Box, Typography, IconButton } from '@mui/material';

import { Image } from 'assets';
import { Mask } from 'modules';
import { useSnackbar, useAuth } from 'hooks';
import { MainBanner } from './BookDetails.styles';
import { BookRequests, ReviewRequests, FavoriteRequests } from 'services';
import { Page, Divider, ReviewCard, SkeletonCard, ReviewModal } from 'components';

function BookDetails() {
    const snackbar = useSnackbar();
    const { idBook } = useParams();
    const { getUser } = useAuth();
    const user = getUser();

    const [bookData, setBookData] = useState(null);
    const [bookDataLoading, setBookDataLoading] = useState(false);

    const [lastReviewsList, setLastReviewsList] = useState([]);
    const [loadingLastReviews, setLoadingLastReviews] = useState(false);

    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false);

    const [isReview, setIsReview] = useState(false);
    const [reviewData, setReviewData] = useState(null);
    const [reviewDataLoading, setReviewDataLoading] = useState(false);

    const [modalStatus, setModalStatus] = useState(false);

    function componentDidMount() {
        getBookById();
        getLastReviews();
        getReviewByIds();
        verifyIsFavorite();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(componentDidMount, [idBook]);

    function getBookById() {
        if (!idBook) return;
        if (bookDataLoading) return;

        setBookDataLoading(true);
        BookRequests.GetBookById(idBook).then((res) => {
            if (res.status) {
                setBookData(res.data);
            } else {
                snackbar('Não foi possível encontrar o livro.').warning();
            }
        }).catch(() => {
            snackbar('Erro ao buscar livro.').error();
        }).finally(() => setBookDataLoading(false));
    }

    function getLastReviews() {
        if (!idBook) return;
        if (loadingLastReviews) return;

        setLoadingLastReviews(true);
        ReviewRequests.GetLastReviews(idBook).then((res) => {
            if (!res.status) return;
            setLastReviewsList(res.data);
        }).catch(() => {
            snackbar('Erro ao últimas reviews do livro.').error();
        }).finally(() => setLoadingLastReviews(false));
    }

    function getReviewByIds() {
        if (!idBook) return;
        if (!user.idUser) return;
        if (reviewDataLoading) return;

        setReviewDataLoading(true);
        ReviewRequests.GetReviewByIds(user.idUser, idBook).then((res) => {
            if (res.status && res.data !== null) {
                setReviewData(res.data);
                setIsReview(true);
            } else {
                setReviewData(null);
                setIsReview(false);
            }
        }).catch(() => {
            snackbar('Erro ao buscar review!').error();
        }).finally(() => setReviewDataLoading(false));
    }

    function addFavorite() {
        if (!idBook) return;
        if (!user.idUser) return;
        if (favoriteLoading) return;

        const dto = {
            idBook: idBook,
            idUser: user.idUser,
        }

        setFavoriteLoading(true);
        FavoriteRequests.Add(dto).then((res) => {
            if (res.status) {
                setIsFavorite(true);
            } else {
                snackbar('Não foi possível adicionar favorito').warning();
            }
        }).catch(() => {
            snackbar('Erro ao adicionar favorito').error();
        }).finally(() => setFavoriteLoading(false));
    }

    function removeFavorite() {
        if (!idBook) return;
        if (!user.idUser) return;
        if (favoriteLoading) return;

        setFavoriteLoading(true);
        FavoriteRequests.Delete(user.idUser, idBook).then((res) => {
            if (res.status) {
                setIsFavorite(false);
            } else {
                snackbar('Não foi possível remover favorito').warning();
            }
        }).catch(() => {
            snackbar('Erro ao remover favorito').error();
        }).finally(() => setFavoriteLoading(false));
    }

    function verifyIsFavorite() {
        if (!idBook) return;
        if (!user.idUser) return;
        if (favoriteLoading) return;

        setFavoriteLoading(true);
        FavoriteRequests.GetFavoritesListByIduser(user.idUser).then((res) => {
            if (res.status) {
                const index = res.data.findIndex((rv) => parseInt(rv.idBook) === parseInt(idBook));
                if (index >= 0) {
                    setIsFavorite(true);
                }
            } else {
                snackbar('Não foi possível validar favorito!').warning();
            }
        }).catch(() => {
            snackbar('Erro ao validar favorito!').error();
        }).finally(() => setFavoriteLoading(false));
    }

    function returnModal(data) {
        setReviewData(data);
        setIsReview(true);

        const index = lastReviewsList.findIndex((rv) => rv.idBook === data.idBook && rv.idUser === data.idUser);
        if (index >= 0) {
            lastReviewsList[index] = {
                ...lastReviewsList[index],
                score: data.score,
                note: data.note,
                status: data.status
            }
            setLastReviewsList([...lastReviewsList]);
        }
    }

    function notFindBookReviewComponent() {
        return (
            <Typography
                variant='h5'
                gutterBottom
                component='div'
                textAlign='center'
            >
                Nenhuma review do livro encontrada no momento.
            </Typography>
        );
    }

    function notFindBookComponent() {
        return (
            <Typography
                variant='h5'
                gutterBottom
                component='div'
                textAlign='center'
            >
                Nenhuma informação do livro encontrada no momento.
            </Typography>
        );
    }

    function loadingLastReviewsComponent() {
        return (
            <Grid container spacing={2} >
                {new Array(3).fill(0).map((_, idx) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={idx}>
                        <SkeletonCard />
                    </Grid>
                ))}
            </Grid>
        );
    }

    function loadingComponent() {
        return (
            <p>Carregando...</p>
        );
    }

    return (
        <Page title='Detalhes do livro' isFullHeight isFullWidth>
            <Grid container justifyContent='center' spacing={2} sx={{ mb: '40px' }}>
                {bookDataLoading ? loadingComponent() : (
                    <React.Fragment>
                        {bookData === null ? notFindBookComponent() : (
                            <React.Fragment>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <MainBanner
                                        image={bookData.photo ? Mask.formatBase64(bookData.photo, 'webp') : Image.Estante}
                                    />
                                </Grid>

                                <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Divider
                                                title='Informações'
                                                action={(
                                                    <div>
                                                        <IconButton
                                                            variant="contained"
                                                            onClick={() => isFavorite ? removeFavorite() : addFavorite()}
                                                            loading={favoriteLoading}
                                                            disabled={favoriteLoading}
                                                        >
                                                            {isFavorite ? <HeartBrokenIcon /> : <FavoriteIcon />}
                                                        </IconButton>
                                                        <IconButton
                                                            variant="contained"
                                                            onClick={() => setModalStatus(true)}
                                                            sx={{ ml: '10px' }}
                                                        >
                                                            {isReview ? <ModeEditIcon /> : <AddIcon />}
                                                        </IconButton>
                                                    </div>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Typography variant='h3' gutterBottom>
                                                    <b>Livro:</b> {bookData.name || '--'}
                                                </Typography>
                                                <Typography variant='h5' gutterBottom>
                                                    <b>Autor:</b> {bookData.author || '--'}
                                                </Typography>
                                                <Typography variant='h5' gutterBottom>
                                                    <b>Data de Publicação:</b> {new Date(bookData.dateOfPublication).toLocaleDateString() || '--'}
                                                </Typography>
                                                <Typography variant='h5' gutterBottom>
                                                    <b>Editora:</b> {bookData.publisher || '--'}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Divider title='Últimas reviews' />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            {loadingLastReviews ? loadingLastReviewsComponent() : (
                                                <React.Fragment>
                                                    {lastReviewsList.length === 0 ? notFindBookReviewComponent() : (
                                                        <Grid container spacing={2}>
                                                            {lastReviewsList.map((review, index) => (
                                                                <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                                                                    <ReviewCard review={review} />
                                                                </Grid>
                                                            ))}
                                                        </Grid>
                                                    )}
                                                </React.Fragment>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                )}
            </Grid>

            <ReviewModal
                open={modalStatus}
                isCreate={!isReview}
                reviewData={reviewData}
                setOpen={setModalStatus}
                idBook={parseInt(idBook)}
                returnFunction={returnModal}
                idUser={parseInt(user.idUser)}
                setModalStatus={setModalStatus}
            />
        </Page>
    );
}

export default BookDetails;
