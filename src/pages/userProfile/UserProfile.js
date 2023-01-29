import React from 'react';
import { Grid } from '@mui/material';

import { Page } from 'components';
import { UserAbout } from './components';

function UserProfile() {

    return (
        <Page title='Perfil do Usuário'>
            <Grid container spacing={10}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Grid container spacing={1} justifyContent='center'>
                        <Grid item xs={12} md={12} xl={12}>
                            <UserAbout userData={{
                                idUser: 1,
                                photo: '',
                                nickname: 'Mauuri',
                                nationality: 'Brasil',
                                name: 'Fábio Augusto',
                            }} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Grid container spacing={1} justifyContent='center'>
                        <Grid item xs={12} md={12} xl={12}>
                            FAVORITOS
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Page>
    );
}

export default UserProfile;
