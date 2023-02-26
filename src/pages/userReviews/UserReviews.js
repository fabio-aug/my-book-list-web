import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import {
    Grid,
    Typography,
    Card,
    CardHeader,
    IconButton,
    CardMedia,
    CardContent
} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import { Mask } from 'modules';
import { useSnackbar } from 'hooks';
import { ReviewRequests } from 'services';
import { Page, Divider, ReviewModal, SkeletonCard } from 'components';

function ReviewList() {
    const snackbar = useSnackbar();
    const { idUser } = useParams();

    const [reviewList, setReviewList] = useState([]);
    const [reviewData, setReviewData] = useState(null);
    const [reviewLoading, setReviewLoading] = useState(false);

    const [modalStatus, setModalStatus] = useState(false);

    function componentDidMount() {
        getReviewsByIduser();
    }
    useEffect(componentDidMount, [idUser]);

    function getReviewsByIduser() {
        if (!idUser) return;
        if (reviewLoading) return;

        setReviewLoading(true);
        ReviewRequests.GetReviewsByIduser(idUser).then((res) => {
            if (res.status) {
                setReviewList(res.data);
            } else {
                snackbar('Não foi possível buscar as reviews do usuário.').warning();
            }
        }).catch((error) => {
            snackbar('Erro ao buscar as reviews do usuário.').error();
        }).finally(() => setReviewLoading(false));
    }

    function loadingComponent() {
        return (
            <Grid container spacing={2} >
                {new Array(4).fill(0).map((_, idx) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={idx}>
                        <SkeletonCard height={165} />
                    </Grid>
                ))}
            </Grid>
        );
    }

    function notFindReviews() {
        return (
            <Typography
                variant='h5'
                gutterBottom
                component='div'
                textAlign='center'
            >
                Nenhuma review encontrada no momento.
            </Typography>
        );
    }

    function getStatus(id) {
        switch (id) {
            case 1:
                return 'Lendo';
            case 2:
                return 'Concluído';
            case 3:
                return 'Parado';
            case 4:
                return 'A Ler';
            default:
                return '--';
        }
    }

    function returnModal(data) {
        const index = reviewList.findIndex((rv) => rv.idUser == data.idUser && rv.idBook == data.idBook);
        if (index >= 0) {
            const aux = reviewList;
            aux[index] = {
                ...aux[index],
                score: data.score,
                status: data.status,
                note: data.note
            };
            setReviewList([...aux]);
        }
    }

    return (
        <Page title='Reviews do Usuário'>
            <Grid container justifyContent='center' spacing={2}>
                <Grid item xs={12} md={12} xl={12}>
                    <Divider title='Reviews' />
                </Grid>

                <Grid item xs={12} md={12} xl={12}>
                    {reviewLoading ? loadingComponent() : (
                        <React.Fragment>
                            {reviewList.length === 0 ? notFindReviews() : (
                                <Grid container spacing={2}>
                                    {reviewList.map((review, idx) => (
                                        <Grid item xs={12} sm={6} md={4} xl={4} key={idx}>
                                            <Card sx={{ height: '100%' }}>
                                                <CardHeader
                                                    action={
                                                        <IconButton
                                                            aria-label="settings"
                                                            onClick={() => {
                                                                setModalStatus(true);
                                                                setReviewData(review);
                                                            }}
                                                        >
                                                            <ModeEditIcon />
                                                        </IconButton>
                                                    }
                                                    title={Mask.redutorString(review.Book.name, 30)}
                                                    subheader={`Nota: ${review.score || '--'} - Status: ${getStatus(review.status)}`}
                                                />
                                                <CardMedia
                                                    component="img"
                                                    height={150}
                                                    image={Mask.formatBase64(review.Book.photo)}
                                                    alt="Capa do livro"
                                                />
                                                <CardContent>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {review.note}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </React.Fragment>
                    )}
                </Grid>
            </Grid>

            <ReviewModal
                open={modalStatus}
                setOpen={setModalStatus}
                isCreate={false}
                reviewData={reviewData}
                idUser={0}
                idBook={0}
                returnFunction={returnModal}
            />
        </Page>
    );
}

export default ReviewList;
