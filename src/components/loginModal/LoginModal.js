import React, { useContext } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { UserRequests } from 'services';
import { Modal } from './LoginModal.styles';
import { useAuth, useSnackbar } from 'hooks';
import { FormikInput } from 'components/formElements';
import { GlobalContext } from 'providers/global/GlobalProvider';

const validationSchema = Yup.object({
    email: Yup.string()
        .email('E-mail inválido.')
        .max(80, 'O e-mail não pode ultrapassar 80 caracteres.')
        .required('Campo obrigatório.'),
    password: Yup.string()
        .max(20, 'A senha não pode ultrapassar 20 caracteres.')
        .required('Campo obrigatório.'),
});

function LoginModal() {
    const auth = useAuth();
    const snackbar = useSnackbar();
    const { login, setLogin, switchModal } = useContext(GlobalContext);

    function handleSignIn(values, actions) {
        UserRequests.Login(values).then((res) => {
            if (res.status) {
                setLogin(false);
                auth.signIn(res.data);
                snackbar("Login feito com sucesso.").success();
            } else {
                snackbar(res.msg || "Não foi possível fazer login.").warning();
            }
        }).catch((error) => {
            snackbar("Erro ao fazer login.").error();
        }).finally(() => {
            actions.setSubmitting(false);
            formik.resetForm();
        });
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: handleSignIn
    });

    function actionLink() {
        switchModal();
        formik.resetForm();
    }

    function closeModal() {
        setLogin(false);
        formik.resetForm();
    }

    return (
        <Modal open={login} onClose={closeModal}>
            <Paper elevation={3} className='paper'>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Typography component="h6" variant="h3" align="center">
                                Login
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <FormikInput
                                name='email'
                                formik={formik}
                                label='E-mail'
                                variant='standard'
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <FormikInput
                                name='password'
                                formik={formik}
                                label='Senha'
                                type='password'
                                variant='standard'
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <LoadingButton
                                color="primary"
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                loading={formik.isSubmitting}
                                disabled={formik.isSubmitting}
                            >
                                Entrar
                            </LoadingButton>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Typography component="h6" variant="h5" align="center">
                                {'Não possui uma conta? '}<Link underline='always' onClick={actionLink}>cadastre-se</Link>{' agora!'}
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Modal>
    );
}

export default LoginModal;
