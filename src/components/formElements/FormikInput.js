import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

import { Mask } from 'modules';

function FormikInput({ name, formik, mask, label, ...rest }) {
    const handleChange = (e) => {
        const value = mask ? Mask.applyMask(mask, e.target.value) : e.target.value;
        formik.setFieldValue(name, value);
    }

    return (
        <TextField
            id={`input-${name}`}
            name={name}
            label={label}
            value={formik.values[name]}
            onChange={handleChange}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
            {...rest}
        />
    )
}

FormikInput.propTypes = {
    name: PropTypes.string.isRequired,
    formik: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    mask: PropTypes.string,
    variant: PropTypes.string
}

FormikInput.defaultProps = {
    variant: 'outlined',
};

export default FormikInput;
