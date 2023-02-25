import React, { useState, useEffect, useContext } from 'react';
import { Button, CardContent, Card, Typography, Grid, CardActions, Avatar, Paper } from '@mui/material';
import { Image } from 'assets';
import { useSnackbar, useHistory } from 'hooks';
import { Page, Divider, BookCard } from 'components';
import { MainBanner, MainContent, Beloved, NewsCards, GridBeloved } from './Home.style';
import { BookRequests, ReviewRequests } from "services";
import { GlobalContext } from 'providers/global/GlobalProvider';


function Home() {

    const snackbar = useSnackbar();

    const history = useHistory();

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
    useEffect(componentDidMount, []);

    function getLastBooks() {
        if (loadingLastBooks) return;
        setLoadingLastBooks(true);
        BookRequests.getLastBooks().then((res) => {
            if (res.status) {
                setLastBooksList(res.data);
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

    return (
        <Page title='Home' isFullHeight isFullWidth>
            <MainBanner container alignItems="center" image={Image.Estante}>
                <Grid item md={8}>
                    <Typography className="maintitle" variant="h1">
                        Bem-vindo ao My Book List
                    </Typography>
                    <Typography className="subtitle" variant="h3" component="h3">
                        Listas e livros para todos os gostos
                    </Typography>
                    <Grid item md={6} className="subscribe">
                        <Paper elevation={1} square className="paper">
                            Participe da nossa comunidade
                            <Button className="button" variant='contained' onClick={() => setRegister(true)}> Cadastre-se </Button>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item md={4} height={'100%'}>
                    <Avatar className="newImage" variant="square" src={Image.Banner} />
                </Grid>
            </MainBanner>
            <MainContent container spacing={2}>

                <Grid item sm={12} md={12} lg={12}>
                    <Divider title='Novidades' />
                </Grid>

                {(!loadingLastBooks && lastBooksList !== null) && (
                    <Grid item sm={12} md={12} lg={12}>
                        <NewsCards container justifyContent="center">
                            <Grid item md={6}>
                                <Avatar className="avatar" variant="square" src={lastBooksList.lastBookOne.photo} />
                            </Grid>
                            <Grid item md={6}>
                                <Card sx={{ minWidth: 275, minHeight: 275 }}>
                                    <CardContent>
                                        <Typography variant="h1" className="nameBook">
                                            {lastBooksList.lastBookOne.name}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary" className="authorBook">
                                            {lastBooksList.lastBookOne.author}
                                        </Typography>
                                        <Typography variant="body2" className="synopsisBook">
                                            {lastBooksList.lastBookOne.synopsis}
                                        </Typography>
                                    </CardContent>

                                    <CardActions>
                                        <Button size="small" onClick={() => redirectCard(lastBooksList.lastBookOne.idBook)}>Saiba mais</Button>
                                    </CardActions>

                                </Card>
                            </Grid>
                            <Grid item md={6}>
                                <Card sx={{ minWidth: 275, minHeight: 275 }}>
                                    <CardContent>
                                        <Typography variant="h1" className="nameBook">
                                            {lastBooksList.lastBookTwo.name}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary" className="authorBook">
                                            {lastBooksList.lastBookTwo.author}
                                        </Typography>
                                        <Typography variant="body2" className="synopsisBook">
                                            {lastBooksList.lastBookTwo.synopsis}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => redirectCard(lastBooksList.lastBookTwo.idBook)}>Saiba mais</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item md={6}>
                                <Avatar className="avatar" variant="square" src={lastBooksList.lastBookTwo.photo} />
                            </Grid>
                        </NewsCards>
                    </Grid>
                )}

                <Grid item sm={12} md={12} lg={12}>
                    <Divider title='Populares' />
                </Grid>

                {(!loadingMostReviewed && mostReviewedList.length !== 0) && (
                    <Grid item sm={12} md={12} lg={12} >
                        <Grid container spacing={2}>
                            {mostReviewedList.map((review, index) => (
                                <Grid item sm={4} md={4} lg={4} key={index}>
                                    <BookCard book={review.Book} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                )}

                <Grid item sm={12} md={12} lg={12}>
                    <Divider title='Os mais queridinhos' />
                </Grid>

                {(!loadingBestReviewed && bestReviewedList.length !== 0) && (
                    <Beloved container sm={12} md={12} lg={12} spacing={2}>
                        {bestReviewedList.map(({ Book }, index) => (
                            <GridBeloved container item sm={4} md={4} lg={4} key={index} onClick={() => redirectCard(Book.idBook)}>
                                <Grid item sm={6} md={6} lg={6}>
                                    <Avatar className="avatarBeloved" variant="square" src={Book.photo} />
                                </Grid>
                                <Grid item sm={6} md={6} lg={6}>
                                    <Card sx={{ minWidth: "100%", minHeight: "100%", justifyContent: "center" }}>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {Book.name}
                                            </Typography>
                                            <Typography variant="body2">
                                                {Book.synopsis}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </GridBeloved>
                        ))}
                    </Beloved>
                )}
            </MainContent>
        </Page>
    )
}

export default Home;
