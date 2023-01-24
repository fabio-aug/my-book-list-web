import { styled } from "@mui/system";
import { CardActions as CardActionsMUI } from "@mui/material";

export const CardActions = styled(CardActionsMUI)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
}));
