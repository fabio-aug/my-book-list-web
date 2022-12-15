import React from 'react';
import PropTypes from 'prop-types';
import {
    FormLabel,
    FormControl,
    FormErrorMessage,
    Textarea as TextareaChakra
} from "@chakra-ui/react";

function Textarea({ formik, label, name, ...rest }) {
    const isError = !!formik.errors[name] && formik.touched[name];

    return (
        <FormControl isInvalid={isError}>
            <FormLabel>{label}</FormLabel>

            <TextareaChakra
                id={name}
                name={name}
                isInvalid={isError}
                onChange={formik.handleChange}
                value={formik.values[name]}
                {...rest}
            />

            {(isError) && (
                <FormErrorMessage>
                    {formik.errors[name]}
                </FormErrorMessage>
            )}
        </FormControl>
    );
}

Textarea.propTypes = {
    // Formik para validação dinâmica
    formik: PropTypes.object.isRequired,

    // Name para identificação do campo
    // Fundamental para funcionamento do Formik
    name: PropTypes.string.isRequired,

    // Label visual para identificação do campo
    label: PropTypes.string.isRequired,
}

export default Textarea;