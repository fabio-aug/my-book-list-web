import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function MainFooter() {
    return (
        <Box component='footer' sx={{ bgcolor: 'background.paper', py: 6 }}>
            <Container maxWidth='lg'>
                <Typography variant='h6' align='center' gutterBottom>
                    My Book List
                </Typography>
                <Typography
                    variant='subtitle1'
                    align='center'
                    color='text.secondary'
                    component='p'
                >
                    Listas e Livros para todos os gostos.
                </Typography>
            </Container>
        </Box>
    )
}

export default MainFooter;
