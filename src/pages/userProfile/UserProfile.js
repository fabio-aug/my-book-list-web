import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

import { Page } from 'components';
import { useSnackbar } from 'hooks';
import { UserRequests } from 'services';
import { UserAbout } from './components';

function UserProfile() {
    const snackbar = useSnackbar();
    const { idUser } = useParams();
    const [userData, setUserData] = useState(null);
    const [userDataLoading, setUserDataLoading] = useState(false);

    useEffect(() => {
        getUserDataById();
    }, [idUser]);

    function getUserDataById() {
        if (!idUser) return;
        if (userDataLoading) return;

        setUserDataLoading(true);
        UserRequests.GetUserById(idUser).then((res) => {
            if (res) {
                setUserData(res);
            } else {
                snackbar('Não foi possível dados do usuário.').warning();
            }
        }).catch((error) => {
            snackbar('Erro ao buscar dados do usuário.').error();
        }).finally(() => setUserDataLoading(false));
    }

    return (
        <Page title='Perfil do Usuário'>
            <Grid container spacing={10}>
                <Grid item xs={12} sm={12} md={5} lg={4} xl={4}>
                    <UserAbout userData={userData} />
                </Grid>
                <Grid item xs={12} sm={12} md={7} lg={8} xl={8}>
                    FAVORITOS
                </Grid>
            </Grid>
        </Page>
    );
}

export default UserProfile;
