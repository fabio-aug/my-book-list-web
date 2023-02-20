import { styled } from "@mui/system";
import { Skeleton } from "@mui/material";

export const LoadingCp = styled(Skeleton)(() => ({
    WebkitTransform: 'initial',
    MozTransform: 'initial',
    msTransform: 'initial',
    transform: 'initial',
}));
