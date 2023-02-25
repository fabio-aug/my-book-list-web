import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useSnackbar } from 'hooks';
import { UserRequests } from 'services';
import { Modal } from './ReviewModal.styles';
import { FormikInput, FormikSelect } from 'components/formElements';

const validationSchema = Yup.object({
    score: Yup.number()
        .required('Campo obrigatório.'),
    status: Yup.number()
        .required('Campo obrigatório.'),
    note: Yup.string()
        .max(1000, 'A nota não pode ultrapassar 1000 caracteres.'),
});

function ReviewModal({ isCreate, open, setOpen, reviewData }) {
    const snackbar = useSnackbar();

    function create(values, actions) {
        const dto = {
            idBook: 0,
            idUser: 0,
            score: values.score,
            status: values.status,
            note: values.note,
            dateOfReview: new Date()
        }

        actions.setSubmitting(false);
    }

    function update(values, actions) {
        const dto = {
            idBook: reviewData.idBook,
            idUser: reviewData.idUser,
            score: values.score,
            status: values.status,
            note: values.note,
            dateOfReview: reviewData.dateOfReview
        }
        
        actions.setSubmitting(false);
    }

    function handleSubmit(values, actions) {
        if (isCreate) {
            create(values, actions)
        } else {
            update(values, actions)
        }
    }

    const formik = useFormik({
        initialValues: {
            score: isCreate ? 10 : reviewData.score,
            status: isCreate ? 1 : reviewData.status,
            note: isCreate ? '' : reviewData.note
        },
        validationSchema,
        onSubmit: handleSubmit
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
                                Review
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <FormikSelect
                                name='score'
                                formik={formik}
                                label='Pontuação'
                                options={[
                                    { value: 10, label: '(10) Obra Prima' },
                                    { value: 9, label: '(9) Excelente' },
                                    { value: 8, label: '(8) Muito Bom' },
                                    { value: 7, label: '(7) Bom' },
                                    { value: 6, label: '(6) Legal' },
                                    { value: 5, label: '(5) Médio' },
                                    { value: 4, label: '(4) Ruim' },
                                    { value: 3, label: '(3) Muito Ruim' },
                                    { value: 2, label: '(2) Hórrivel' },
                                    { value: 1, label: '(1) Péssimo' },
                                ]}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <FormikSelect
                                name='status'
                                formik={formik}
                                label='Status'
                                options={[
                                    { value: 1, label: 'Lendo' },
                                    { value: 2, label: 'Concluído' },
                                    { value: 3, label: 'Parado' },
                                    { value: 4, label: 'A Ler' },
                                ]}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <FormikInput
                                name='note'
                                formik={formik}
                                label='Nota'
                                type='text'
                                multiline
                                rows={3}
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
                                {isCreate ? 'Criar' : 'Editar'}
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Modal>
    );
}

ReviewModal.propTypes = {
    isCreate: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    reviewData: PropTypes.object
}

export default ReviewModal;
