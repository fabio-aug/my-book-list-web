import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

import { Divider, BookCard } from 'components';
import { Wrapper } from './UserFavorites.styles';

function UserFavorites({ favoriteList }) {
    return (
        <Wrapper container justifyContent='center' spacing={2}>
            <Grid item xs={12} md={12} xl={12}>
                <Divider title='Favoritos' />
            </Grid>

            <Grid item xs={12} md={12} xl={12}>
                <Grid container justifyContent='center' spacing={2}>
                    {favoriteList.map((favorite, idx) => (
                        <Grid item xs={12} sm={6} md={4} xl={4} key={idx}>
                            <BookCard book={favorite} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Wrapper>
    );
}

UserFavorites.propTypes = {
    favoriteList: PropTypes.array.isRequired
}

export default UserFavorites;
