import React from 'react';
import { Box, Heading, Button } from '@chakra-ui/react';

function Header() {
    return (
        <Box>
            <Heading as='h3' size='xl'>
                My Book List
            </Heading>

            <Button colorScheme="blackAlpha">
                Cadastrar
            </Button>
        </Box>
    );
}

export default Header;