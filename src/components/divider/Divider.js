import React from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    Divider as DividerMUI
} from '@mui/material';

import { Wrapper } from './Divider.style';

function Divider({ title, action, ...rest }) {
    return (
        <Wrapper {...rest}>
            <div className='box'>
                <Typography
                    variant='h3'
                    component='div'
                >
                    {title}
                </Typography>

                {action}
            </div>
            <DividerMUI />
        </Wrapper>
    )
}

Divider.propTypes = {
    title: PropTypes.string.isRequired,
    action: PropTypes.node || PropTypes.element
}

export default Divider;
