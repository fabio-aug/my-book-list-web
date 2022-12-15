import React from 'react';
import PropTypes from 'prop-types';
import {
    FormLabel,
    FormControl,
    FormErrorMessage,
    Select as SelectChakra
} from "@chakra-ui/react";

function Select({ formik, label, name, options, ...rest }) {
    const isError = !!formik.errors[name] && formik.touched[name];

    return (
        <FormControl isInvalid={isError}>
            <FormLabel>{label}</FormLabel>

            <SelectChakra
                id={name}
                name={name}
                isInvalid={isError}
                onChange={formik.handleChange}
                value={formik.values[name]}
                {...rest}
            >
                {options.map((item, idx) => (
                    <option key={idx} value={item.value}>{item.label}</option>
                ))}
            </SelectChakra>

            {(isError) && (
                <FormErrorMessage>
                    {formik.errors[name]}
                </FormErrorMessage>
            )}
        </FormControl>
    )
}

Select.propTypes = {
    // Formik para validação dinâmica
    formik: PropTypes.object.isRequired,

    // Name para identificação do campo
    // Fundamental para funcionamento do Formik
    name: PropTypes.string.isRequired,

    // Label visual para identificação do campo
    label: PropTypes.string.isRequired,

    // Array com opções do Select
    // Cara opção deve conter value como int e label como string
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired
    })).isRequired
}

export default Select;