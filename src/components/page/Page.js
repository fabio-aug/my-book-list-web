import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Page = forwardRef(({ children, title = '', ...rest }, ref) => {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <div ref={ref} {...rest}>
            {children}
        </div>
    );
});

Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string
};

export default Page;