import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import format from 'date-fns/format';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import differenceInYears from 'date-fns/differenceInYears';

import { UserRequests } from 'services';
import { useAuth, useSnackbar } from 'hooks';
import { Modal } from './UserUpdateModal.styles';
import { regex, masks, unmask, applyMask } from 'modules/Mask';
import { FormikInput } from 'components/formElements';

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
        .required('Campo obrigatório.')
});

function UserUpdateModal({ userData, open, setOpen }) {
    const snackbar = useSnackbar();
    const auth = useAuth();

    function handleUpdate(values, actions) {
        const dto = {
            idUser: userData.idUser,
            photo: null,
            name: values.name,
            email: values.email,
            nickname: values.nickname,
            password: values.password,
            phone: unmask(values.phone),
            dateOfBirth: values.dateOfBirth,
            nationality: values.nationality,
        }

        UserRequests.Update(dto).then((res) => {
            if (res.status) {
                setOpen(false);
                res.data.idUser = userData.idUser;
                auth.setUser(res.data);
                snackbar("Informações atualizadas com sucesso.").success();
            } else {
                snackbar(res.msg || "Não foi possível atualizar cadastro.").warning();
            }
        }).catch((error) => {
            snackbar("Erro ao atualizar cadastro.").error();
        }).finally(() => {
            actions.setSubmitting(false);
        });
    }

    const formik = useFormik({
        initialValues: {
            name: userData.name || '',
            nickname: userData.nickname || '',
            dateOfBirth: format(new Date(userData.dateOfBirth), 'yyyy-MM-dd') || '',
            email: userData.email || '',
            nationality: userData.nationality || '',
            phone: applyMask(masks.cellphone, userData.phone) || '',
            password: ''
        },
        validationSchema: validation,
        onSubmit: handleUpdate
    });

    function closeModal() {
        setOpen(false);
        formik.resetForm();
    }

    return (
        <Modal open={open} onClose={closeModal}>
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
                                Cadastrar
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Modal>
    );
}

UserUpdateModal.propTypes = {
    userData: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
}

export default UserUpdateModal;
