import { styled } from '@mui/material';

export const MainBanner = styled('div')(({ image }) => ({
    minWidth: '300px',
    minHeight: '300px',
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
}));
