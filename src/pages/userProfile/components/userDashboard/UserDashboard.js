import React from 'react';
import { Grid } from '@mui/material';

import { Divider } from 'components';

function UserDashboard() {
    return (
        <Grid container justifyContent='center' spacing={2}>
            <Grid item xs={12} md={12} xl={12}>
                <Divider title='Detalhes' />
            </Grid>

            <Grid item xs={12} md={12} xl={12}>
                Dashboard
            </Grid>
        </Grid>
    );
}

export default UserDashboard;
