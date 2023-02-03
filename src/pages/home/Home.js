import React, { useState, useEffect } from 'react';
import { Button, CardContent, Card, Typography, Grid, Box, CardActions, Avatar, Paper, ArrowForwardOutlinedIcon, Icon } from '@mui/material';
import { Image } from 'assets';
import { useSnackbar } from 'hooks';
import { Page, Divider, BookCard } from 'components';
import { MainBanner, NewsCards, MainContent,Beloved} from './Home.style';
import { BookRequests } from "services";

function Home() {
    const snackbar = useSnackbar();

    const [bookList, setBookList] = useState([]);
    const [bookSearch, setBookSearch] = useState('');
    const [loading, setLoading] = useState(false);

    function componentDidMount() {
        searchBook(bookSearch, 1);
    }
    useEffect(componentDidMount, []);
    function searchBook(searchTerm, page) {
        if (loading) return;

        setLoading(true);
        BookRequests.SearchBook("", 1, 3).then((res) => {
            if (res) {
                setBookList(res.bookList);
                console.table(res.bookList);
            }
        }).catch((error) => {
            snackbar('Erro.').error();
        }).finally(() => setLoading(false));
    }
    return (
        <Page title='Home' isFullHeight isFullWidth>
            <MainBanner container alignItems="center" image={Image.Estante}>
                <Grid item md={8}>
                    <Typography className="maintitle" variant="h1" component="h1">
                        Bem-vindo ao My Book List
                    </Typography>
                    <Typography className="subtitle" variant="h3" component="h3">
                        Listas e livros para todos os gostos
                    </Typography>
                    <Grid item md={4} className="subscribe">
                        <Box sx={{ backgroundColor: 'paper' }}>
                            <Paper elevation={24} square={true}>
                                Participe da nossa comunidade
                                <Button> Cadastre-se </Button>
                            </Paper>

                        </Box>
                    </Grid>
                </Grid>
                <Grid item md={4}>
                    <Avatar className="newImage" variant="square" src={Image.Banner} />
                </Grid>
            </MainBanner>
            <MainContent container spacing={2}>
                <Grid item sm={12} md={12} lg={12}>
                    <Divider title='Novidades' />
                </Grid>
                <Grid item sm={12} md={12} lg={12}>
                    <NewsCards container justifyContent="center">
                        <Grid item md={6}>
                            <Avatar className="avatar" variant="square" src="https://picsum.photos/200/300" />
                        </Grid>
                        <Grid item md={6}>
                            <Card sx={{ minWidth: 275, minHeight: 275 }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Nome do Livro
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Autor
                                    </Typography>
                                    <Typography variant="body2">
                                        Breve descrição do livro
                                    </Typography>
                                </CardContent>

                                <CardActions>
                                    <Button size="small">Saiba mais</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item md={6}>
                            <Card sx={{ minWidth: 275, minHeight: 275, justifyContent: "center" }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Nome do Livro
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Autor
                                    </Typography>
                                    <Typography variant="body2">
                                        Breve descrição do livro
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Saiba mais</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item md={6}>
                            <Avatar className="avatar" variant="square" src="https://picsum.photos/200/300" />
                        </Grid>
                    </NewsCards>
                </Grid>

                <Grid item sm={12} md={12} lg={12}>
                    <Divider title='Populares' />
                </Grid>

                <Grid item sm={12} md={12} lg={12} >
                    <Grid container spacing={2}>
                        {
                            bookList.map((book, index) => (
                                <Grid item sm={4} md={4} lg={4} key={index}>
                                    <BookCard book={book} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>

                <Grid item sm={12} md={12} lg={12}>
                    <Divider title='Os mais queridinhos' />
                </Grid>
                <Beloved container>
                    <Grid item sm={2} md={2} lg={2}>
                        <Avatar className="avatarBeloved" variant="square" src="https://picsum.photos/200/300" />
                    </Grid>
                    <Grid item sm={2} md={2} lg={2}>
                        <Card sx={{ minWidth: "100%", minHeight: "100%", justifyContent: "center" }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Nome do Livro
                                </Typography>
                                <Typography variant="body2">
                                    Breve descrição do livro
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Saiba mais</Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item sm={2} md={2} lg={2}>
                        <Avatar className="avatarBeloved" variant="square" src="https://picsum.photos/200/300" />
                    </Grid>
                    <Grid item sm={2} md={2} lg={2}>
                        <Card sx={{ minWidth: "100%", minHeight: "100%" }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Nome do Livro
                                </Typography>
                                <Typography variant="body2">
                                    Breve descrição do livro
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Saiba mais</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item sm={2} md={2} lg={2}>
                        <Avatar className="avatarBeloved" variant="square" src="https://picsum.photos/200/300" />
                    </Grid>
                    <Grid item sm={2} md={2} lg={2}>
                        <Card sx={{ minWidth: "100%", minHeight: "100%" }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Nome do Livro
                                </Typography>
                                <Typography variant="body2">
                                    Breve descrição do livro
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Saiba mais</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Beloved>
            </MainContent>
        </Page>
    )
}

export default Home;
