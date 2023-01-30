import React, { useState } from 'react';
import { Image } from 'assets';
import { useSnackbar } from 'hooks';
import { Page, Modal } from 'components';
import { MainBanner, MainTitle, NewsCards } from './Home.style';
import '@fontsource/roboto/700.css';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

function Home() {
  const snackbar = useSnackbar();
  const [modalStatus, setModalStatus] = useState(false);
  return (
    <Page title='Home' isFullHeight isFullWidth>
      <MainBanner image={Image.Estante}>
        <MainTitle>
          <Typography variant="primary" component="h1">
            Bem-vindo ao My Book List
          </Typography>
        </MainTitle>
        
        <SubTitle>
          <Typography variant="h3" component="h3">
            Listas e livros para todos os gostos.
          </Typography>
        </SubTitle>

      </MainBanner>

      <NewsCards>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Livro
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Resumo do livro
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            image={Image.MenReading}
            align="rigth"
            height="100px"
            width="10px"
          />
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Saiba Mais
          </Button>
        </CardActions>
      </NewsCards>
    </Page>
  )
}

export default Home;
