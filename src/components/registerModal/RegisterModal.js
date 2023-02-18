import React, { useContext } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import format from 'date-fns/format';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import differenceInYears from 'date-fns/differenceInYears';

import { UserRequests } from 'services';
import { useAuth, useSnackbar } from 'hooks';
import { Modal } from './RegisterModal.styles';
import { regex, masks, unmask } from 'modules/Mask';
import { FormikInput } from 'components/formElements';
import { GlobalContext } from 'providers/global/GlobalProvider';

const validation = Yup.object({
    name: Yup.string()
        .max(80, 'O nome não pode ultrapassar 80 caracteres.')
        .required('Campo obrigatório.'),
    nickname: Yup.string()
        .max(30, 'O nickname não pode ultrapassar 30 caracteres.'),
    dateOfBirth: Yup.date()
        .required('Campo obrigatório.')
        .test('dateOfBirth', "Você deve ter ao menos 18 anos.", function (value) {
            return differenceInYears(new Date(), new Date(value)) >= 18;
        }),
    email: Yup.string()
        .email('E-mail inválido.')
        .max(80, 'O e-mail não pode ultrapassar 80 caracteres.')
        .required('Campo obrigatório.'),
    nationality: Yup.string()
        .max(30, 'A nacionalidade não pode ultrapassar 30 caracteres.')
        .required('Campo obrigatório.'),
    phone: Yup.string()
        .min(masks.cellphone.length, 'Telefone está incompleto.')
        .max(masks.cellphone.length, `O telefone não pode ultrapassar ${masks.cellphone.length} caracteres.`)
        .matches(regex.cellphone, 'Telefone não aceita letras ou caracteres especiais.')
        .required('Campo obrigatório.'),
    password: Yup.string()
        .max(20, "A senha não pode ultrapassar 20 caracteres.")
        .required('Campo obrigatório.'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Senhas diferentes.')
        .required('Campo obrigatório.'),
});

function RegisterModal() {
    const auth = useAuth();
    const snackbar = useSnackbar();
    const { register, setRegister, switchModal } = useContext(GlobalContext);

    function handleRegister(values, actions) {
        const dto = {
            name: values.name,
            nickname: values.nickname,
            dateOfBirth: values.dateOfBirth,
            email: values.email,
            nationality: values.nationality,
            phone: unmask(values.phone),
            password: values.confirmPassword,
            photo: null
        }

        UserRequests.Create(dto).then((res) => {
            if (res.status) {
                setRegister(false);
                auth.signIn(res.data);
                snackbar("Cadastro feito com sucesso.").success();
            } else {
                snackbar(res.msg || "Não foi possível fazer cadastro.").warning();
            }
        }).catch((error) => {
            snackbar("Erro ao fazer cadastro.").error();
        }).finally(() => {
            actions.setSubmitting(false);
            formik.resetForm();
        });
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            nickname: '',
            dateOfBirth: format(new Date(), 'yyyy-MM-dd'),
            email: '',
            nationality: '',
            phone: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validation,
        onSubmit: handleRegister
    });

    function actionLink() {
        switchModal();
        formik.resetForm();
    }

    function closeModal() {
        setRegister(false);
        formik.resetForm();
    }

    return (
        <Modal open={register} onClose={closeModal}>
            <Paper elevation={3} className='paper'>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Typography component="h6" variant="h3" align="center">
                                Cadastro
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <FormikInput
                                name='name'
                                formik={formik}
                                label='Nome'
                                variant='standard'
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <FormikInput
                                name='nickname'
                                formik={formik}
                                label='Nickname'
                                variant='standard'
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <FormikInput
                                name='email'
                                formik={formik}
                                label='E-mail'
                                variant='standard'
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <FormikInput
                                name='dateOfBirth'
                                formik={formik}
                                label='Data de Nascimento'
                                type='date'
                                variant='standard'
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <FormikInput
                                name='phone'
                                formik={formik}
                                label='Telefone'
                                variant='standard'
                                mask={masks.cellphone}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <FormikInput
                                name='nationality'
                                formik={formik}
                                label='Nacionalidade'
                                variant='standard'
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <FormikInput
                                name='password'
                                formik={formik}
                                label='Senha'
                                type='password'
                                variant='standard'
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <FormikInput
                                name='confirmPassword'
                                formik={formik}
                                label='Confirmar Senha'
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
                                Cadastrar
                            </LoadingButton>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Typography component="h6" variant="h5" align="center">
                                {'Já possui uma conta? '}<Link underline='always' onClick={actionLink}>entre</Link>{' agora!'}
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Modal>
    );
}

export default RegisterModal;
