import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

import { Page } from 'components';
import { useSnackbar } from 'hooks';
import { UserRequests, FavoriteRequests } from 'services';
import { UserAbout, UserFavorites } from './components';

function UserProfile() {
    const snackbar = useSnackbar();
    const { idUser } = useParams();

    const [userData, setUserData] = useState(null);
    const [userLoading, setUserLoading] = useState(false);

    const [favoriteList, setFavoriteList] = useState([]);
    const [favoriteLoading, setFavoriteLoading] = useState(false);

    useEffect(() => {
        getUserDataById();
        getFavoritesListByIduser();
    }, [idUser]);

    function getUserDataById() {
        if (!idUser) return;
        if (userLoading) return;

        setUserLoading(true);
        UserRequests.GetUserById(idUser).then((res) => {
            if (res) {
                setUserData(res);
            } else {
                snackbar('Não foi possível buscar os dados do usuário.').warning();
            }
        }).catch((error) => {
            snackbar('Erro ao buscar os dados do usuário.').error();
        }).finally(() => setUserLoading(false));
    }

    function getFavoritesListByIduser() {
        if (!idUser) return;
        if (favoriteLoading) return;

        setFavoriteLoading(true);
        FavoriteRequests.GetFavoritesListByIduser(idUser).then((res) => {
            if (res) {
                const data = res.map((favorite) => (favorite.Book));
                setFavoriteList(data);
            } else {
                snackbar('Não foi possível os livros favoritos do usuário.').warning();
            }
        }).catch((error) => {
            snackbar('Erro ao buscar os livros favoritos do usuário.').error();
        }).finally(() => setFavoriteLoading(false));
    }

    return (
        <Page title='Perfil do Usuário'>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={5} md={4} lg={4} xl={4}>
                    <UserAbout userData={userData} />
                </Grid>
                <Grid item xs={12} sm={7} md={8} lg={8} xl={8}>
                    <UserFavorites favoriteList={favoriteList} />
                </Grid>
            </Grid>
        </Page>
    );
}

export default UserProfile;
