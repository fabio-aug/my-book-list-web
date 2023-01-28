import { styled } from "@mui/system";
import {
    Card as CardMUI,
    CardMedia as CardMediaMUI
} from "@mui/material";

export const Card = styled(CardMUI)(() => ({
    ':hover': {
        cursor: 'pointer',
        transform: 'scale(1.05)'
    }
}));

export const CardMedia = styled(CardMediaMUI)(() => ({
    width: '100%',
    maxHeight: '200px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
}));
