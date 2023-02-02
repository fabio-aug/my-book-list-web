import React, { useState } from 'react';
import {Button, CardContent, Card, Typography, Grid, CardActions,Avatar} from '@mui/material';
import { Image } from 'assets';
import { useSnackbar } from 'hooks';
import { Page, Modal,Divider, } from 'components';
import { MainBanner, NewsCards} from './Home.style';



function Home() {
    const snackbar = useSnackbar();
    return (
        <Page title='Home' isFullHeight isFullWidth>
            <MainBanner container alignItems="center" image={Image.Estante}>
                <Grid item md={8}>
                    <Typography className="maintitle" variant="h1" component="h1">
                        Bem-vindo ao My Book List
                    </Typography>
                    <Typography className="subtitle" variant="h3" component="h3">
                        Listas e livros para todos os gostos.
                    </Typography>
                </Grid>
                <Grid item md={4}>
                    <Avatar className="newImage" variant="square" src={Image.Banner} />
                </Grid>
            </MainBanner>
            <Grid item sm={12} md={12} lg={12}>
                    <Divider title='Novidades' />
            </Grid>
            <NewsCards container justifyContent="center">
                <Grid item md={6}>
                    <Avatar className="avatar" variant="square" src="https://picsum.photos/200/300" />
                </Grid>
                <Grid item md={6}>
                    <Card sx={{ minWidth: 275 , minHeight: 275}}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Nome do Livro
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Tipo do livro
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
                    <Card sx={{ minWidth: 275 , minHeight: 275}}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Nome do Livro
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Tipo do livro
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
            
            <Grid item sm={12} md={12} lg={12}>
                    <Divider title='Populares'/>
            </Grid>

            <Grid item sm={12} md={12} lg={12}>
                    <Divider title='Os mais queridinhos' />
            </Grid>
        </Page>
    )
}

export default Home;
