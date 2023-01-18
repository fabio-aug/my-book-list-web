import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function FormikDatepicker({ name, formik, options, label, ...rest }) {
    const isError = formik.touched[name] && Boolean(formik.errors[name]);

    return (
        <FormControl error={isError}>
            <DatePicker
                label={label}
                value={formik.values[name]}
                onChange={(e) => formik.setFieldValue(name, e)}
                inputFormat='dd/MM/yyyy'
                renderInput={(params) => (
                    <TextField
                        error={isError}
                        helperText={formik.touched[name] && formik.errors[name]}
                        {...params}
                    />
                )}
                {...rest}
            />
        </FormControl>
    );
}

FormikDatepicker.propTypes = {
    name: PropTypes.string.isRequired,
    formik: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired
}

export default FormikDatepicker;
