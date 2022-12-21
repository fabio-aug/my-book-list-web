import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Typography, Box, Grid, Paper } from '@mui/material';

import { Image } from 'assets';
import { useSnackbar } from 'hooks';
import { Page, Modal } from 'components';
import { Container } from './Home.style';

const validationSchema = Yup.object({
    email: Yup.string().email('Digite um email válido').max(255).required('Email é obrigatório'),
    password: Yup.string().max(255).required('Senha é obrigatória')
});

function Home() {
    const snackbar = useSnackbar();

    const [modalStatus, setModalStatus] = useState(false);

    const handleSignIn = (values) => {
        console.log(values)
    }

    const formik = useFormik({
        initialValues: {
            email: 'example@example.io',
            password: 'Password123'
        },
        validationSchema,
        onSubmit: handleSignIn
    });

    return (
        <Page title="Home">
            <Paper
                sx={{
                    position: 'relative',
                    backgroundColor: 'grey.800',
                    color: '#fff',
                    mb: 4,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${Image.Estante})`,
                }}
            >
                {<img style={{ display: 'none' }} src={Image.Estante} alt={"Estante de livros"} />}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: 'rgba(0,0,0,.3)',
                    }}
                />
                <Grid container>
                    <Grid item md={6}>
                        <Box
                            sx={{
                                position: 'relative',
                                p: { xs: 3, md: 6 },
                                pr: { md: 0 },
                            }}
                        >
                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                My Book List
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                Listas e Livros para todos os gostos.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <Container>
                <Button variant='contained'
                    onClick={() => {
                        snackbar("Teste").success();
                    }}
                >
                    Alert
                </Button>
                <Button variant='contained'
                    onClick={() => setModalStatus(true)}
                >
                    Modal
                </Button>

                <Modal
                    title="Modal Home"
                    open={modalStatus}
                    onClose={() => setModalStatus(false)}
                    content={
                        <div>
                            Modal Home
                        </div>
                    }
                />
            </Container>

            <Container>
                <form onSubmit={formik.handleSubmit}>
                    <Box my={2}>
                        <Button
                            color="primary"
                            disabled={formik.isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Sign in now
                        </Button>
                    </Box>
                </form>
            </Container>
        </Page>
    )
}

export default Home;