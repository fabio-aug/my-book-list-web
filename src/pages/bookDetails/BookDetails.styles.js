import { Skeleton, styled } from '@mui/material';

export const MainBanner = styled('div')(({ image }) => ({
    minWidth: '300px',
    minHeight: '300px',
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
}));

export const SkeletonBookPhoto = styled(Skeleton)(() => ({
    height: 200,
    width:"100%"
}));

export const SkeletonBookText = styled(Skeleton)(() => ({
    fontSize: '1rem'
}));
