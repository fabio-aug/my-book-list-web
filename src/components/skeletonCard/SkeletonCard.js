import React from 'react';
import PropTypes from 'prop-types';
import { Box, Skeleton } from '@mui/material';

function SkeletonCard({ height = 200 }) {
    return (
        <Box sx={{ width: '100%' }}>
            <Skeleton variant='rectangular' width='100%' height={height} />
            <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width='60%' />
            </Box>
        </Box>
    );
}

SkeletonCard.propTypes = {
    height: PropTypes.number
}

export default SkeletonCard;
