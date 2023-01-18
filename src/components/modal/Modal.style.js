import { IconButton as IconButtonMUI, styled } from '@mui/material';

export const IconButton = styled(IconButtonMUI)(({ theme }) => ({
	position: 'absolute',
	right: theme.spacing.unit,
	top: theme.spacing.unit,
	color: theme.palette.grey[500],
}));
