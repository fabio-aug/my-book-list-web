import React from 'react';
import PropTypes from 'prop-types';
import { Typography, CardContent } from '@mui/material';

import { Image } from 'assets';
import { useHistory } from 'hooks';
import { Card, CardMedia } from './BookCard.styles';

function BookCard({ book, ...rest }) {
    const history = useHistory();

    function redirectCard(idBook) {
        history.redirectTo(`/detalhes-do-livro/${idBook}`);
    }

    return (
        <Card onClick={() => redirectCard(book.idBook)} {...rest}>
            <CardMedia
                component='img'
                image={book.photo || Image.Book}
                title='Imagem da capa do livro'
            />
            <CardContent>
                <Typography
                    variant='h5'
                    component='div'
                >
                    {book.name}
                </Typography>
                <Typography
                    variant='body2'
                    color='text.secondary'
                    gutterBottom
                >
                    {book.author}
                </Typography>
                <Typography
                    variant='body2'
                    color='text.secondary'
                >
                    {book.synopsis}
                </Typography>
            </CardContent>
        </Card>
    );
}

BookCard.propTypes = {
    book: PropTypes.shape({
        idBook: PropTypes.number.isRequired,
        author: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        synopsis: PropTypes.string.isRequired,
        photo: PropTypes.string,
    })
};

export default BookCard;
