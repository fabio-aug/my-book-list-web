import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import {
    ResponsiveContainer,
    BarChart, Bar, Cell,
    XAxis, Tooltip
} from 'recharts';

import { Divider } from 'components';
import { LoadingCp } from './UserDashboard.styles';

function UserDashboard({ loading, dashboardData, ...rest }) {
    const data = useMemo(() => {
        if (!dashboardData) return [];

        const aux = [];
        aux.push({
            name: 'Lendo',
            value: dashboardData.reading,
            color: '#4caf50'
        });

        aux.push({
            name: 'Completo',
            value: dashboardData.completed,
            color: '#03a9f4'
        });

        aux.push({
            name: 'Parado',
            value: dashboardData.stopped,
            color: '#ff9800'
        });

        aux.push({
            name: 'Pretende ler',
            value: dashboardData.toRead,
            color: '#cccccc'
        });

        return aux;
    }, [dashboardData]);

    function loadingComponent() {
        return (
            <LoadingCp
                animation='wave'
                height='100%'
                width='100%'
            />
        );
    }

    function notFindDataComponent() {
        return (
            <Typography
                variant='h5'
                gutterBottom
                component='div'
                textAlign='center'
            >
                Nenhuma informação encontrada no momento.
            </Typography>
        );
    }

    return (
        <Grid container justifyContent='center' spacing={2} {...rest}>
            <Grid item xs={12} md={12} xl={12}>
                <Divider title='Detalhes' />
            </Grid>

            <Grid item xs={12} md={12} xl={12} sx={{ height: 300 }}>
                {loading ? loadingComponent() : (
                    <React.Fragment>
                        {dashboardData === null ? notFindDataComponent() : (
                            <ResponsiveContainer width='100%' height='100%'>
                                <BarChart
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 5,
                                        left: 5,
                                        bottom: 5,
                                    }}
                                >
                                    <XAxis dataKey='name' />
                                    <Tooltip />
                                    <Bar
                                        dataKey='value'
                                        fill='#00a0fc'
                                        stroke='#000000'
                                        strokeWidth={1}
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </React.Fragment>
                )}
            </Grid>
        </Grid>
    );
}

UserDashboard.propTypes = {
    loading: PropTypes.bool.isRequired,
    dashboardData: PropTypes.object
}

export default UserDashboard;
