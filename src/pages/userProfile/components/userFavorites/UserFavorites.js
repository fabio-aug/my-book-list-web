import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';

import { Divider, BookCard, SkeletonCard } from 'components';

function UserFavorites({ favoriteList, loading }) {
    function loadingComponent() {
        return (
            <Grid container spacing={2} >
                {new Array(4).fill(0).map((_, idx) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={idx}>
                        <SkeletonCard height={165} />
                    </Grid>
                ))}
            </Grid>
        );
    }

    function notFindFavorites() {
        return (
            <Typography
                variant='h5'
                gutterBottom
                component='div'
                textAlign='center'
            >
                Nenhum livro favorito encontrado no momento.
            </Typography>
        );
    }

    return (
        <Grid container justifyContent='center' spacing={2}>
            <Grid item xs={12} md={12} xl={12}>
                <Divider title='Favoritos' />
            </Grid>

            <Grid item xs={12} md={12} xl={12}>
                {loading ? loadingComponent() : (
                    <React.Fragment>
                        {favoriteList.length === 0 ? notFindFavorites() : (
                            <Grid container justifyContent='center' spacing={2}>
                                {favoriteList.map((favorite, idx) => (
                                    <Grid item xs={12} sm={6} md={4} xl={4} key={idx}>
                                        <BookCard
                                            book={favorite}
                                            showSynopsis={false}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </React.Fragment>
                )}
            </Grid>
        </Grid>
    );
}

UserFavorites.propTypes = {
    favoriteList: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

export default UserFavorites;
