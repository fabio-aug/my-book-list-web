import React from 'react';
import * as Yup from 'yup';
import { useFormik } from "formik";
import { Box, Button, Flex } from "@chakra-ui/react";

import { RestAPI } from '../../modules';
import { Input, Number, Select, Textarea } from '../../components';

const validationSchema = Yup.object().shape({
    input: Yup.string()
        .required('select'),

    textarea: Yup.string()
        .required('textarea'),

    number: Yup.number()
        .required('num'),

    select: Yup.number()
        .required('select'),
});

function Home() {
    const formik = useFormik({
        initialValues: {
            input: "",
            textarea: "",
            number: 0,
            select: 1,
        },
        validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        }
    });

    function teste() {
        RestAPI.login(null).then((res) => {
            console.log('foi')
        }).catch((erro) => {
            console.log('erro', erro)
        });
    }

    return (
        <Flex bg="gray.100" align="center" justify="center" h="100vh">
            <Box bg="white" p={6} rounded="md" w={64}>
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        label="Input"
                        name="input"
                        formik={formik}
                    />

                    <Textarea
                        label="Textarea"
                        name="textarea"
                        formik={formik}
                    />

                    <Number
                        label="Number"
                        name="number"
                        formik={formik}
                    />

                    <Select
                        label="Select"
                        name="select"
                        formik={formik}
                        options={[
                            { value: 1, label: 'teste1' },
                            { value: 2, label: 'teste2' },
                            { value: 3, label: 'teste3' },
                            { value: 4, label: 'teste4' },
                        ]}
                    />

                    <Button onClick={teste} colorScheme="purple" width="full">
                        Login
                    </Button>
                </form>
            </Box>
        </Flex>
    );
}

export default Home;