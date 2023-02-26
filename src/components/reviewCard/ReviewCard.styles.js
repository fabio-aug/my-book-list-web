import { styled } from "@mui/system";
import { Card } from "@mui/material";

export const CardReview = styled(Card)(() => ({
    height: '100%',
    
    ':hover': {
        cursor: 'pointer',
        transform: 'scale(1.05)'
    }
}));
