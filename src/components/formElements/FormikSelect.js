import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, Select, InputLabel, MenuItem, FormHelperText } from '@mui/material';

function FormikSelect({ name, formik, options, label, ...rest }) {
    const isError = formik.touched[name] && Boolean(formik.errors[name]);

    return (
        <FormControl error={isError}>
            <InputLabel
                id={`select-inputLabel-${name}`}
            >
                {label}
            </InputLabel>
            <Select
                id={`select-${name}`}
                label={label}
                value={formik.values[name]}
                onChange={(e) => formik.setFieldValue(name, e.target.value)}
                {...rest}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {options.map((item, idx) => (
                    <MenuItem
                        key={idx}
                        value={item.value}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </Select>

            {(isError) &&
                <FormHelperText>{formik.errors[name]}</FormHelperText>
            }
        </FormControl>
    );
}

FormikSelect.propTypes = {
    name: PropTypes.string.isRequired,
    formik: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.any.isRequired,
        label: PropTypes.string.isRequired,
    })),
    variant: PropTypes.string
}

FormikSelect.defaultProps = {
    variant: 'outlined',
};

export default FormikSelect;