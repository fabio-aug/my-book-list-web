import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

import { Page } from 'components';
import { useSnackbar, useAuth } from 'hooks';
import {
    UserAbout,
    UserFriends,
    UserDashboard,
    UserFavorites,
    UserUpdateModal
} from './components';
import {
    UserRequests,
    ReviewRequests,
    FavoriteRequests,
    FriendshipRequests
} from 'services';

function UserProfile() {
    const snackbar = useSnackbar();
    const { idUser } = useParams();
    const { getUser } = useAuth();
    const currentUser = getUser();

    const [userData, setUserData] = useState(null);
    const [userLoading, setUserLoading] = useState(false);

    const [favoriteList, setFavoriteList] = useState([]);
    const [favoriteLoading, setFavoriteLoading] = useState(false);

    const [friendshipList, setFriendshipList] = useState([]);
    const [friendshipPage, setFriendshipPage] = useState(0);
    const [friendshipPageCount, setFriendshipPageCount] = useState(1);
    const [friendshipLoading, setFriendshipLoading] = useState(false);

    const [reviewDashboard, setReviewDashboard] = useState(null);
    const [reviewLoading, setReviewLoading] = useState(false);

    const [isFriendShip, setIsFriendShip] = useState(false);
    const [verifyFriendshipLoading, setVerifyFriendshipLoading] = useState(false);
    const [createFriedshipLoading, setCreateFriedshipLoading] = useState(false);
    const [deleteFriendshipLoading, setDeleteFriendshipLoading] = useState(false);

    const [userUpdateModal, setUserUpdateModal] = useState(false);

    useEffect(() => {
        if (!currentUser) return;
        setUserData(currentUser);
    }, [currentUser]);

    useEffect(() => {
        getUserDataById();
        searchUserFriendship(1);
        getFavoritesListByIduser();
        getDashboardByIdUser();
        verifyFriendship();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idUser]);

    function getUserDataById() {
        if (!idUser) return;
        if (userLoading) return;
        if (parseInt(currentUser.idUser) === parseInt(idUser)) {
            setUserData(currentUser);
            return;
        };

        setUserLoading(true);
        UserRequests.GetUserById(idUser).then((res) => {
            if (res.status) {
                setUserData(res.data);
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
            if (res.status) {
                setFriendshipList(res.data.friendshipList);
                setFriendshipPage(page);
                setFriendshipPageCount(res.data.pageCount);
            } else {
                snackbar('Não foi possível buscar a lista de amigos do usuário.').warning();
            }
        }).catch((error) => {
            snackbar('Erro ao buscar a lista de amigos do usuário.').error();
        }).finally(() => setFriendshipLoading(false));
    }

    function getDashboardByIdUser() {
        if (!idUser) return;
        if (reviewLoading) return;

        setReviewLoading(true);
        ReviewRequests.DashboardByIdUser(idUser).then((res) => {
            if (res.status) {
                setReviewDashboard(res.data);
            } else {
                snackbar('Não foi possível buscar dashboard do usuário.').warning();
            }
        }).catch((error) => {
            snackbar('Erro ao buscar dashboard do usuário.').error();
        }).finally(() => setReviewLoading(false));
    }

    function verifyFriendship() {
        if (!idUser) return;
        if (parseInt(currentUser.idUser) === parseInt(idUser)) return;
        if (verifyFriendshipLoading) return;

        setVerifyFriendshipLoading(true);
        FriendshipRequests.VerifyFriendship(currentUser.idUser, idUser).then((res) => {
            if (res.status) {
                setIsFriendShip(res.data);
            } else {
                snackbar('Não foi possível validar amizade de usuário').warning();
            }
        }).catch((error) => {
            snackbar('Erro ao validar amizade de usuário').error();
        }).finally(() => setVerifyFriendshipLoading(false));
    }

    function createFriendship() {
        if (!idUser) return;
        if (isFriendShip) return;
        if (createFriedshipLoading) return;
        if (parseInt(currentUser.idUser) === parseInt(idUser)) return;

        const dto = {
            idUser1: currentUser.idUser,
            idUser2: idUser
        }

        setCreateFriedshipLoading(true);
        FriendshipRequests.CreateFriendship(dto).then((res) => {
            if (res.status) {
                setIsFriendShip(res.data);
            } else {
                snackbar(res.msg || 'Não foi possível seguir usuário').warning();
            }
        }).catch((error) => {
            snackbar('Erro ao seguir usuário').error();
        }).finally(() => setCreateFriedshipLoading(false));
    }

    function deleteFriendship() {
        if (!idUser) return;
        if (parseInt(currentUser.idUser) === parseInt(idUser)) return;
        if (deleteFriendshipLoading) return;

        setDeleteFriendshipLoading(true);
        FriendshipRequests.DeleteFriendship(currentUser.idUser, idUser).then((res) => {
            if (res.status) {
                setIsFriendShip(res.data);
            } else {
                snackbar('Não foi possível deixar de seguir usuário').warning();
            }
        }).catch((error) => {
            console.log(error)
            snackbar('Erro ao deixar de seguir usuário').error();
        }).finally(() => setDeleteFriendshipLoading(false));
    }

    return (
        <Page title='Perfil do Usuário'>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={5} md={4} lg={4} xl={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <UserAbout
                                userData={userData}
                                loading={userLoading}
                                isFriendShip={isFriendShip}
                                isEditButton={parseInt(currentUser.idUser) === parseInt(idUser)}
                                isFriendShipLoading={verifyFriendshipLoading || deleteFriendshipLoading || createFriedshipLoading}
                                addFriend={createFriendship}
                                deleteFriend={deleteFriendship}
                                openModal={setUserUpdateModal}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <UserFriends
                                friendshipList={friendshipList}
                                page={friendshipPage}
                                pageCount={friendshipPageCount}
                                searchFriend={searchUserFriendship}
                                loading={friendshipLoading}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={7} md={8} lg={8} xl={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <UserFavorites
                                favoriteList={favoriteList}
                                loading={favoriteLoading}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <UserDashboard
                                loading={reviewLoading}
                                dashboardData={reviewDashboard}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <UserUpdateModal
                userData={currentUser}
                open={userUpdateModal}
                setOpen={setUserUpdateModal}
            />
        </Page>
    );
}

export default UserProfile;
