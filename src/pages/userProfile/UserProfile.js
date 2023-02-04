import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

import { Page } from 'components';
import { useSnackbar } from 'hooks';
import { UserAbout, UserFavorites, UserFriends, UserDashboard } from './components';
import { UserRequests, FavoriteRequests, FriendshipRequests } from 'services';

function UserProfile() {
    const snackbar = useSnackbar();
    const { idUser } = useParams();

    const [userData, setUserData] = useState(null);
    const [userLoading, setUserLoading] = useState(false);

    const [favoriteList, setFavoriteList] = useState([]);
    const [favoriteLoading, setFavoriteLoading] = useState(false);

    const [friendshipList, setFriendshipList] = useState([]);
    const [friendshipPage, setFriendshipPage] = useState(0);
    const [friendshipPageCount, setFriendshipPageCount] = useState(1);
    const [friendshipLoading, setFriendshipLoading] = useState(false);

    useEffect(() => {
        getUserDataById();
        searchUserFriendship(1);
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

    function searchUserFriendship(page) {
        if (!idUser) return;
        if (friendshipLoading) return;
        if (friendshipPage === page) return;

        setFriendshipLoading(true);
        FriendshipRequests.SearchUserFriendship(idUser, page, 4).then((res) => {
            if (res) {
                setFriendshipList(res.friendshipList);
                setFriendshipPage(page);
                setFriendshipPageCount(res.pageCount);
            } else {
                snackbar('Não foi possível buscar a lista de amigos do usuário.').warning();
            }
        }).catch((error) => {
            snackbar('Erro ao buscar a lista de amigos do usuário.').error();
        }).finally(() => setFriendshipLoading(false));
    }

    return (
        <Page title='Perfil do Usuário'>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={5} md={4} lg={4} xl={4}>
                    <UserAbout
                        userData={userData}
                        loading={userLoading}
                    />
                </Grid>
                <Grid item xs={12} sm={7} md={8} lg={8} xl={8}>
                    <UserFavorites
                        favoriteList={favoriteList}
                        loading={favoriteLoading}
                    />
                </Grid>

                <Grid item xs={12} sm={5} md={4} lg={4} xl={4}>
                    <UserFriends
                        friendshipList={friendshipList}
                        page={friendshipPage}
                        pageCount={friendshipPageCount}
                        searchFriend={searchUserFriendship}
                        loading={friendshipLoading}
                    />
                </Grid>
                <Grid item xs={12} sm={7} md={8} lg={8} xl={8}>
                    <UserDashboard />
                </Grid>
            </Grid>
        </Page>
    );
}

export default UserProfile;
