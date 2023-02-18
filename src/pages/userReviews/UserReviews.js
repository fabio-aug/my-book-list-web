import React, { useState, useEffect } from 'react'

import {
    Grid,
    Pagination,
    Typography,
    FormControl,
} from '@mui/material';

import { useParams } from 'react-router-dom';
import { PagesContainer } from './UserReviews.style';
import { Page, Divider, SkeletonCard } from 'components';
import { UserRequests} from 'services';
import { useSnackbar } from 'hooks';


function UserReviews() {
    const snackbar = useSnackbar();
    const { idUser } = useParams();


    const [userLoading, setUserLoading] = useState(false);
    const [loading] = useState(false);

    const review = 0;
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    /* useEffect(() => {
        getUserDataById();
    }, [idUser]);

    function getUserDataById() {
        if (!idUser) return;
        if (userLoading) return;

        setUserLoading(true);
        UserRequests.GetUserById(idUser).then((res) => {
            if (res) {
                setUserReviews(res);
            } else {
                snackbar('Não foi possível buscar os dados do usuário.').warning();
            }
        }).catch((error) => {
            snackbar('Erro ao buscar os dados do usuário.').error();
        }).finally(() => setUserReviews(false));
    } */

    function loadingComponent() {
        return (
            <Grid container spacing={2} >
                {new Array(4).fill(0).map((_, idx) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                        <SkeletonCard />
                    </Grid>
                ))}
            </Grid>
        );
    }

    function hasNoReview() {
        return (
            <Typography
                variant='h5'
                gutterBottom
                component='div'
                textAlign='center'
            >
                Este usuário ainda não possui nenhuma review.
            </Typography>
        );
    }

    return (
        <Page title='Reviews do Usuário'>
            <Grid container justifyContent='center' spacing={2}>
                <Grid item sm={12} md={12} lg={12}>
                    <Divider title='Reviews de Usuário' />
                </Grid>
                <Grid item sm={12} md={12} lg={12}>
                    {loading ? loadingComponent() : (
                        <React.Fragment>
                            {review === 0 ? hasNoReview() : (
                                <Grid container spacing={2}>
                                    <PagesContainer item xs={12} sm={12} md={12} lg={12} xl={12} justifyContent='center'>
                                        <Pagination
                                            count={pageCount}
                                            page={page}
                                        />
                                    </PagesContainer>
                                </Grid>
                            )}
                        </React.Fragment>
                    )}
                </Grid>
            </Grid>
        </Page >
    );
}

export default UserReviews
