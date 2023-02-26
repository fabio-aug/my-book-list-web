import React from 'react';
import PropTypes from 'prop-types';
import {
    CardContent,
    Typography,
    Box
} from '@mui/material';
import { CardReview } from './ReviewCard.styles';

import { useHistory } from 'hooks';

function ReviewCard({ review }) {

    const history = useHistory();

    function getStatus(id) {
        switch (id) {
            case 1:
                return 'Lendo';
            case 2:
                return 'Concluído';
            case 3:
                return 'Parado';
            case 4:
                return 'A Ler';
            default:
                return '--';
        }
    }

    const dot = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    )

    return (
        <CardReview
            variant='outlined'
            onClick={() => history.redirectTo(`/perfil-do-usuario/${review.idUser}`)}
        >

            <CardContent>
                <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                    {review.User.nickname || '--'}
                </Typography>
                <Typography variant='h5' component='div'>
                    {review.User.name || '--'}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                    Nota: {review.score || '--'} {dot} Status: {getStatus(review.status)}
                </Typography>
                <Typography variant='body2'>
                    {review.note || '--'}
                </Typography>
            </CardContent>
        </CardReview>
    )
}

ReviewCard.propTypes = {
    review: PropTypes.object.isRequired
}

export default ReviewCard;
