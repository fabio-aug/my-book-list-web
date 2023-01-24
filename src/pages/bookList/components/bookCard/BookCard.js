import React from 'react';
import PropTypes from 'prop-types';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Card, Button, CardMedia, Typography, CardContent } from '@mui/material';

import { useHistory } from 'hooks';
import { CardActions } from './BookCard.styles';

function BookCard({ book, ...rest }) {
    const history = useHistory();

    function redirectCard(idBook) {
        history.redirectTo(`/detalhes-do-livro/${idBook}`);
    }

    return (
        <Card {...rest}>
            <CardMedia
                component='img'
                image={book.image}
                title='Imagem da capa do livro'
            />
            <CardContent>
                <Typography
                    gutterBottom
                    variant='caption'
                    component='div'
                >
                    {book.genre} | {book.dateRegistration}
                </Typography>
                <Typography
                    gutterBottom
                    variant='h5'
                    component='div'
                >
                    {book.title}
                </Typography>
                <Typography
                    variant='body2'
                    color='text.secondary'
                >
                    {book.synopsis}
                </Typography>
            </CardContent>
            <CardActions>
                <Typography
                    variant='body2'
                    color='text.secondary'
                >
                    {book.author}
                </Typography>
                <Button
                    variant='text'
                    endIcon={<ArrowRightAltIcon />}
                    onClick={() => redirectCard(book.idBook)}
                >
                    Ler mais
                </Button>
            </CardActions>
        </Card>
    );
}

BookCard.propTypes = {
    book: PropTypes.shape({
        idBook: PropTypes.number.isRequired,
        author: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        synopsis: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        dateRegistration: PropTypes.string.isRequired
    })
};

export default BookCard;
