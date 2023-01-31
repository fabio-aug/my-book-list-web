import React from 'react';
import PropTypes from 'prop-types';

import {
    Grid,
    Card,
    Button,
    CardMedia,
    Typography,
    CardContent,
    CardActions,
} from '@mui/material';

import { Image } from 'assets';
import { Divider } from 'components';
import { Wrapper } from './UserAbout.styles';

function UserAbout({ userData }) {
    return (
        <Wrapper container justifyContent='center' spacing={2}>
            <Grid item xs={12} md={12} xl={12}>
                <Divider title='Sobre' />
            </Grid>

            <Grid item xs={12} md={12} xl={12}>
                <Card>
                    <CardMedia
                        className='user-image'
                        title='Imagem do Usuário'
                        image={userData.photo ? userData.photo : Image.User}
                    />
                    <CardContent> 
                        <Typography
                            variant='h3'
                            textAlign='center'
                            component='div'
                            gutterBottom
                        >
                            {userData.name}
                        </Typography>
                        <Typography
                            variant='h4'
                            textAlign='center'
                            component='div'
                            gutterBottom
                        >
                            {userData.nickname}
                        </Typography>
                        <Typography
                            variant='h5'
                            textAlign='center'
                            component='div'
                            gutterBottom
                        >
                            {userData.nationality}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size='small'>Share</Button>
                        <Button size='small'>Learn More</Button>
                    </CardActions>
                </Card>
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
    })
}

export default UserAbout;
