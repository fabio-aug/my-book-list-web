import React, { useState, useEffect, useContext } from 'react';
import { Button, CardContent, Card, Typography, Grid, CardActions, Avatar, Paper, useMediaQuery } from '@mui/material';

import { Mask } from 'modules';
import { Image } from 'assets';
import { useSnackbar, useHistory, useAuth } from 'hooks';
import { Page, Divider, BookCard, SkeletonCard } from 'components';
import { MainBanner, MainContent, Beloved, NewsCards, GridBeloved, SubGrid } from './Home.style';
import { BookRequests, ReviewRequests } from "services";
import { GlobalContext } from 'providers/global/GlobalProvider';

function Home() {
    const history = useHistory();
    const snackbar = useSnackbar();
    const { isAuthenticated } = useAuth();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

    const [lastBooksList, setLastBooksList] = useState(null);
    const [loadingLastBooks, setLoadingLastBooks] = useState(false);

    const [bestReviewedList, setBestReviewedList] = useState([]);
    const [loadingBestReviewed, setLoadingBestReviewed] = useState(false);

    const [mostReviewedList, setMostReviewedList] = useState([]);
    const [loadingMostReviewed, setLoadingMostReviewed] = useState(false);

    const { setRegister } = useContext(GlobalContext);

    function componentDidMount() {
        getLastBooks();
        getBestReviewed();
        getMostReviewed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(componentDidMount, []);

    function getLastBooks() {
        if (loadingLastBooks) return;
        setLoadingLastBooks(true);
        BookRequests.getLastBooks().then((res) => {
            if (res.status) {
                if (!res.data?.lastBookOne || !res.data?.lastBookTwo) {
                    setLastBooksList(null);
                } else {
                    setLastBooksList(res.data);
                }
            }
        }).catch((error) => {
            snackbar('Erro ao buscar livro.').error();
        }).finally(() => setLoadingLastBooks(false));
    }

    function getBestReviewed() {
        if (loadingBestReviewed) return;
        setLoadingBestReviewed(true);
        ReviewRequests.getBestReviewed().then((res) => {
            if (res.status) {
                setBestReviewedList(res.data.bookList);
            }
        }).catch((error) => {
            snackbar('Erro ao buscar livro.').error();
        }).finally(() => setLoadingBestReviewed(false));
    }

    function getMostReviewed() {
        if (loadingMostReviewed) return;
        setLoadingMostReviewed(true);
        ReviewRequests.getMostReviewed().then((res) => {
            if (res.status) {
                setMostReviewedList(res.data.bookList);
            }
        }).catch((error) => {
            snackbar('Erro ao buscar livro.').error();
        }).finally(() => setLoadingMostReviewed(false));
    }

    function redirectCard(idBook) {
        history.redirectTo(`/detalhes-do-livro/${idBook}`);
    }

    function loadingComponent() {
        return (
            <Grid container spacing={2} >
                {new Array(3).fill(0).map((_, idx) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={idx}>
                        <SkeletonCard height={165} />
                    </Grid>
                ))}
            </Grid>
        );
    }

    function notFindBooksWithReviews() {
        return (
            <Typography
                variant='h5'
                gutterBottom
                component='div'
            >
                Nenhum livro na categoria foi encontrado no momento.
            </Typography>
        );
    }

    return (
        <Page title='Home' isFullHeight isFullWidth>
            <MainBanner container alignItems="center" image={Image.Estante}>
                <Grid item md={12}>
                    <Typography className="maintitle" variant="h1">
                        Bem-vindo ao My Book List
                    </Typography>
                    <Typography className="subtitle" variant="h3" component="h3">
                        Listas e livros para todos os gostos
                    </Typography>
                    {!isAuthenticated && (
                        <SubGrid item md={12} className="subscribe">
                            <Paper variant="outlined" className="paper">
                                Participe da nossa comunidade
                                <Button className="button" variant='contained' onClick={() => setRegister(true)}> Cadastre-se </Button>
                            </Paper>
                        </SubGrid>
                    )}
                </Grid>
            </MainBanner>
            <MainContent container spacing={2}>
                {(!loadingLastBooks && lastBooksList !== null) && (
                    <React.Fragment>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Divider title='Novidades' />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <NewsCards container justifyContent="center" spacing={isMobile ? 2 : 0}>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <Avatar
                                                src={Mask.formatBase64(lastBooksList.lastBookOne.photo) || Image.Book}
                                                title='Imagem da capa do livro'
                                                className='avatar'
                                                variant='square'
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <Card sx={{ minWidth: 275, minHeight: 275 }}>
                                                <CardContent>
                                                    <Typography variant="h1" className="nameBook">
                                                        {Mask.redutorString(lastBooksList.lastBookOne.name, 35)}
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary" className="authorBook">
                                                        {Mask.redutorString(lastBooksList.lastBookOne.author, 30)}
                                                    </Typography>
                                                    <Typography variant="body2" className="synopsisBook">
                                                        {Mask.redutorString(lastBooksList.lastBookOne.synopsis, 200)}
                                                    </Typography>
                                                </CardContent>

                                                <CardActions>
                                                    <Button size="small" onClick={() => redirectCard(lastBooksList.lastBookOne.idBook)}>Saiba mais</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <Card sx={{ minWidth: 275, minHeight: 275 }}>
                                                <CardContent>
                                                    <Typography variant="h1" className="nameBook">
                                                        {Mask.redutorString(lastBooksList.lastBookTwo.name, 35)}
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary" className="authorBook">
                                                        {Mask.redutorString(lastBooksList.lastBookTwo.author, 30)}
                                                    </Typography>
                                                    <Typography variant="body2" className="synopsisBook">
                                                        {Mask.redutorString(lastBooksList.lastBookTwo.synopsis, 200)}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small" onClick={() => redirectCard(lastBooksList.lastBookTwo.idBook)}>Saiba mais</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <Avatar
                                                src={Mask.formatBase64(lastBooksList.lastBookTwo.photo) || Image.Book}
                                                title='Imagem da capa do livro'
                                                className='avatar'
                                                variant='square'
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </NewsCards>
                        </Grid>
                    </React.Fragment>
                )}

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Divider title='Populares' />
                </Grid>

                {loadingMostReviewed ? loadingComponent() : (
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        {mostReviewedList.length === 0 ? notFindBooksWithReviews() : (
                            <Grid container spacing={2}>
                                {mostReviewedList.map((review, index) => (
                                    <Grid item sm={4} md={4} lg={4} key={index}>
                                        <BookCard book={review.Book} />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Grid>
                )}

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Divider title='Os mais queridinhos' />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    {loadingBestReviewed ? loadingComponent() : (
                        <React.Fragment>
                            {bestReviewedList.length === 0 ? notFindBooksWithReviews() : (
                                <Beloved container spacing={2}>
                                    {bestReviewedList.map(({ Book }, index) => (
                                        <GridBeloved container item sm={4} md={4} lg={4} key={index} onClick={() => redirectCard(Book.idBook)}>
                                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                                <Avatar className="avatarBeloved" variant="square" src={Mask.formatBase64(Book.photo)} />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                                <Card sx={{ minWidth: "100%", minHeight: "100%", justifyContent: "center" }}>
                                                    <CardContent>
                                                        <Typography variant="h5" component="div">
                                                            {Mask.redutorString(Book.name, 25)}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            {Mask.redutorString(Book.synopsis, 65)}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </GridBeloved>
                                    ))}
                                </Beloved>
                            )}
                        </React.Fragment>
                    )}
                </Grid>
            </MainContent>
        </Page>
    )
}

export default Home;
