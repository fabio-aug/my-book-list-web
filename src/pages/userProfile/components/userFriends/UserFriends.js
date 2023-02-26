import React from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    Card,
    Skeleton,
    CardMedia,
    Pagination,
    Typography,
    CardContent
} from '@mui/material';

import { Mask } from 'modules';
import { Image } from 'assets';
import { useHistory } from 'hooks';
import { Divider } from 'components';
import { Wrapper } from './UserFriends.styles';

function UserFriends({ friendshipList, page, pageCount, searchFriend, loading }) {
    const history = useHistory();

    function redirectCard(idBook) {
        history.redirectTo(`/perfil-do-usuario/${idBook}`);
    }

    function loadingComponent() {
        return (
            <Grid container spacing={2} >
                {new Array(4).fill(0).map((_, idx) => (
                    <Grid item xs={12} sm={12} md={12} lg={12} key={idx}>
                        <Card className='card'>
                            <Skeleton
                                variant='rounded'
                                className='image'
                            />
                            <CardContent className='skeleton-content'>
                                <Skeleton animation='wave' width='100%' />
                                <Skeleton animation='wave' width='60%' />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }

    function notFindFrienships() {
        return (
            <Typography
                variant='h5'
                gutterBottom
                component='div'
                textAlign='center'
            >
                Nenhum amigo encontrado no momento.
            </Typography>
        );
    }

    return (
        <Wrapper container justifyContent='center' spacing={2}>
            <Grid item xs={12} md={12} xl={12}>
                <Divider title='Amigos' />
            </Grid>

            <Grid item xs={12} md={12} xl={12}>
                {loading ? loadingComponent() : (
                    <React.Fragment>
                        {friendshipList.length === 0 ? notFindFrienships() : (
                            <Grid container justifyContent='center' spacing={2}>
                                {friendshipList.map(({ friend }, idx) => (
                                    <Grid item xs={12} sm={12} md={12} xl={12} key={idx}>
                                        <Card className='card' onClick={() => redirectCard(friend.idUser)}>
                                            <CardMedia
                                                className='image'
                                                image={friend?.photo ? Mask.formatBase64(friend.photo) : Image.User}
                                                alt='Live from space album cover'
                                            />
                                            <CardContent>
                                                <Typography variant='subtitle1'>
                                                    {friend?.nickname || '--'}
                                                </Typography>
                                                <Typography variant='h6'>
                                                    {friend.name}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                                <Grid item xs={12} md={12} xl={12} className='pagination'>
                                    <Pagination
                                        count={pageCount}
                                        page={page}
                                        onChange={(event, value) => searchFriend(value)}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </React.Fragment>
                )}
            </Grid>
        </Wrapper>
    );
}

UserFriends.propTypes = {
    friendshipList: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    searchFriend: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
}

export default UserFriends;
