import React from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    Card,
    Skeleton,
    CardMedia,
    Typography,
    CardContent,
    Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';

import { Image } from 'assets';
import { Divider } from 'components';
import { Wrapper } from './UserAbout.styles';

function UserAbout({
    isFriendShipLoading,
    isFriendShip, userData,
    isEditButton, loading,
    addFriend, deleteFriend,
    openModal
}) {
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
                                <CardContent className='content'>
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
                                    {isEditButton ? (
                                        <Button
                                            onClick={() => openModal(true)}
                                            variant='contained'
                                            endIcon={<EditIcon />}
                                        >
                                            Editar perfil
                                        </Button>
                                    ) : (
                                        <LoadingButton
                                            variant='contained'
                                            disabled={isFriendShipLoading}
                                            loading={isFriendShipLoading}
                                            onClick={() => isFriendShip ? deleteFriend() : addFriend()}
                                        >
                                            {isFriendShip ? 'Seguindo' : 'Seguir'}
                                        </LoadingButton>
                                    )}
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
    isFriendShipLoading: PropTypes.bool.isRequired,
    isEditButton: PropTypes.bool.isRequired,
    isFriendShip: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    addFriend: PropTypes.func.isRequired,
    deleteFriend: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired
}

export default UserAbout;
