import React, { useState, useEffect } from 'react'

import { Grid } from '@mui/material';

import { useParams } from 'react-router-dom';
import { Page } from 'components';
import { Reviews } from './components';
import { ReviewRequests } from 'services';
import { useSnackbar } from 'hooks';


function UserReviews() {
    const snackbar = useSnackbar();
    const { idUser } = useParams();

    const [userLoading, setUserLoading] = useState(false);
    const [loading] = useState(false);

    const [reviewList, setReviewList] = useState([]);
    const [reviewLoading, setReviewLoading] = useState(false);

    useEffect(() => {
        getReviewsByIduser();
    }, [idUser]);


    function getReviewsByIduser() {
        if (!idUser) return;
        if (reviewLoading) return;

        setReviewLoading(true);
        ReviewRequests.GetReviewsByIduser(idUser).then((res) => {
            if (res) {
                const data = res.map((favorite) => (favorite.Book));
                setReviewList(data);
            } else {
                snackbar('Não foi possível buscar as reviews do usuário.').warning();
            }
        }).catch((error) => {
            snackbar('Erro ao buscar as reviews do usuário.').error();
        }).finally(() => setReviewLoading(false));
    }

    return (
        <Page title='Reviews do Usuário'>
            <Grid container justifyContent='center' spacing={2}>
                <Grid item sm={12} md={12} lg={12}>
                    <Reviews
                        reviewList={reviewList}
                        loading={userLoading}
                    />
                </Grid>
            </Grid>
        </Page >
    );
}

export default UserReviews;
