import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './Page.styles';

function Page({
    title = 'MyBookList',
    isFullWidth = false,
    isFullHeight = false,
    children,
    ...rest
}) {
    document.title = title;

    return (
        <Wrapper {...rest}
            isFullWidth={isFullWidth ? '100%' : '80%'}
            isFullHeight={isFullHeight ? '0px' : '40px'}
        >
            <div className='box'>
                {children}
            </div>
        </Wrapper>
    );
}

Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    isFullWidth: PropTypes.bool,
    isFullHeight: PropTypes.bool
};

export default Page;
