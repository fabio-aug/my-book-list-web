import React from 'react';
import PropTypes from 'prop-types';
import {
    FormLabel,
    NumberInput,
    FormControl,
    FormErrorMessage,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from "@chakra-ui/react";

function Number({ formik, label, name, ...rest }) {
    const isError = !!formik.errors[name] && formik.touched[name];

    return (
        <FormControl isInvalid={isError}>
            <FormLabel>{label}</FormLabel>

            <NumberInput
                id={name}
                name={name}
                isInvalid={isError}
                onChange={(valueAsString, valueAsNumber) => formik.setFieldValue(name, valueAsNumber)}
                value={formik.values[name]}
                {...rest}
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>

            {(isError) && (
                <FormErrorMessage>
                    {formik.errors[name]}
                </FormErrorMessage>
            )}
        </FormControl>
    );
}

Number.propTypes = {
    // Formik para validação dinâmica
    formik: PropTypes.object.isRequired,

    // Name para identificação do campo
    // Fundamental para funcionamento do Formik
    name: PropTypes.string.isRequired,

    // Label visual para identificação do campo
    label: PropTypes.string.isRequired,
}

export default Number;