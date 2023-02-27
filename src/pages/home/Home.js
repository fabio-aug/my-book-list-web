import React, { useState, useEffect, useContext } from 'react';
import { Button, CardContent, Card, Typography, Grid, CardActions, Avatar, Paper} from '@mui/material';

import { Mask } from 'modules';
import { Image } from 'assets';
import { useSnackbar, useHistory } from 'hooks';
import { Page, Divider, BookCard } from 'components';
import { MainBanner, MainContent, Beloved, NewsCards, GridBeloved,SubGrid} from './Home.style';
import { BookRequests, ReviewRequests } from "services";
import { GlobalContext } from 'providers/global/GlobalProvider';

function Home() {
    const history = useHistory();
    const snackbar = useSnackbar();

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
                <Grid item md={12}>
                    <Typography className="maintitle" variant="h1">
                        Bem-vindo ao My Book List
                    </Typography>
                    <Typography className="subtitle" variant="h3" component="h3">
                        Listas e livros para todos os gostos
                    </Typography>
                     <SubGrid item md={12} className="subscribe">
                        <Paper variant="outlined" className="paper">
                            Participe da nossa comunidade
                            <Button className="button" variant='contained' onClick={() => setRegister(true)}> Cadastre-se </Button>
                        </Paper>
                    </SubGrid>
                </Grid>
            </MainBanner>
            <MainContent container spacing={2}>

                <Grid item sm={12} md={12} lg={12}>
                    <Divider title='Novidades' />
                </Grid>

                {(!loadingLastBooks && lastBooksList !== null) && (
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <NewsCards container justifyContent="center">
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
            </MainContent>
        </Page>
    )
}

export default Home;
