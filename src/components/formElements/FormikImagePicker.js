import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Grid, Typography,
    Avatar, Button
} from '@mui/material'

import { Encryption, Mask } from 'modules';
import { ImagePicker } from './styles';

function FormikImagePicker(props) {
    const { formik, name, title, error, size, fileSizeLimt } = props;
    const [sizeError, setSizeError] = useState(null);

    const handleChange = async (e) => {
        const file = e.target.files[0];
        
        if (!file) return;
        const fileSize = ((file.size / 1024) / 1024).toFixed(4);
        if (fileSize > fileSizeLimt) return setSizeError(`Arquivo maior que ${fileSizeLimt}Mb`);
        setSizeError(null);
        const imageBase64 = await Encryption.readFileAsDataURL(file);
        const result = imageBase64.split('base64,')[1];
        formik.setFieldValue(name, result);
    }

    const removeImage = (e) => {
        const input = document.getElementById(name);
        input.value = '';
        setSizeError(null);
        formik.setFieldValue(name, '');
    }

    return (
        <ImagePicker
            container
            spacing={3}
            size={size}
        >
            <input
                type="file"
                accept="image/*"
                id={name}
                onChange={handleChange}
                className='input'
            />
            <Grid item>
                <div className='frame'>
                    <Avatar
                        alt="image-picker"
                        variant="square"
                        title={title}
                        src={Mask.formatBase64(formik.values[name])}
                        className='image'
                    >
                        Logo
                    </Avatar>
                </div>
            </Grid>
            <Grid item xs>
                <Grid container direction="column">
                    <Typography variant="h6">{title}</Typography>
                    {fileSizeLimt && <Typography variant="caption" gutterBottom>Tamanho máximo do arquivo {fileSizeLimt}Mb</Typography>}
                </Grid>
                <Grid container spacing={1}>
                    <Grid item>
                        <Button
                            size="small"
                            variant="outlined"
                            component="label"
                            htmlFor={name}
                        >
                            Selecione uma imagem
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={removeImage}
                            className='removeButton'
                        >
                            Remover imagem
                        </Button>
                    </Grid>
                </Grid>
                {sizeError ? (
                    <Typography className='errorText' variant="caption">{sizeError}</Typography>
                ) : error && (
                    <Typography className='errorText' variant="caption">{error}</Typography>
                )}
            </Grid>
        </ImagePicker>
    );
}

FormikImagePicker.propTypes = {
    size: PropTypes.number,
    error: PropTypes.string,
    title: PropTypes.string,
    fileSizeLimt: PropTypes.number,
    name: PropTypes.string.isRequired,
    formik: PropTypes.object.isRequired
}

FormikImagePicker.defaultProps = {
    size: 80,
    error: '',
    title: 'Imagem',
    fileSizeLimt: 5,
}

export default FormikImagePicker;
