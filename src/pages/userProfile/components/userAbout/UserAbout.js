import React from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    Card,
    Skeleton,
    CardMedia,
    Typography,
    CardContent
} from '@mui/material';

import { Image } from 'assets';
import { Divider } from 'components';
import { Wrapper } from './UserAbout.styles';

function UserAbout({ userData, loading }) {
    function loadingComponent() {
        return (
            <Card>
                <Skeleton
                    variant='rounded'
                    className='user-image'
                />
                <CardContent>
                    <Skeleton animation='wave' width='100%' />
                    <Skeleton animation='wave' width='60%' />
                    <Skeleton animation='wave' width='30%' />
                </CardContent>
            </Card>
        );
    }

    function notFindUser() {
        return (
            <Typography
                variant='h5'
                gutterBottom
                component='div'
                textAlign='center'
            >
                Nenhum dado do usuário encontrado no momento.
            </Typography>
        );
    }

    return (
        <Wrapper container justifyContent='center' spacing={2}>
            <Grid item xs={12} md={12} xl={12}>
                <Divider title='Sobre' />
            </Grid>

            <Grid item xs={12} md={12} xl={12}>
                {loading ? loadingComponent() : (
                    <React.Fragment>
                        {!userData ? notFindUser() : (
                            <Card>
                                <CardMedia
                                    className='user-image'
                                    title='Imagem do Usuário'
                                    image={userData?.photo ? userData.photo : Image.User}
                                />
                                <CardContent>
                                    <Typography
                                        variant='h3'
                                        textAlign='center'
                                        component='div'
                                        gutterBottom
                                    >
                                        {userData?.name || '--'}
                                    </Typography>
                                    <Typography
                                        variant='h4'
                                        textAlign='center'
                                        component='div'
                                        gutterBottom
                                    >
                                        {userData?.nickname || '--'}
                                    </Typography>
                                    <Typography
                                        variant='h5'
                                        textAlign='center'
                                        component='div'
                                    >
                                        {userData?.nationality || '--'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        )}
                    </React.Fragment>
                )}
            </Grid>
        </Wrapper>
    );
}

UserAbout.propTypes = {
    userData: PropTypes.shape({
        idUser: PropTypes.number.isRequired,
        photo: PropTypes.string,
        nickname: PropTypes.string,
        nationality: PropTypes.string,
        name: PropTypes.string.isRequired,
    }),
    loading: PropTypes.bool.isRequired
}

export default UserAbout;
