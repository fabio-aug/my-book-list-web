import React, { useState } from 'react'

import {
    Grid,
    Pagination,
    Typography,
    FormControl,
} from '@mui/material';

import { PagesContainer } from './UserReviews.styles';
import { Page, Divider, SkeletonCard } from 'components';

function UserReviews() {
    const [loading] = useState(false);
    const review = 0;
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

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
