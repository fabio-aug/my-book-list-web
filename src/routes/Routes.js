import React, { useMemo } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

import { useAuth } from 'hooks';
import { MainLayout } from 'layouts';

import {
    Home,
    BookList,
    UserProfile,
    BookDetails,
    UserReviews
} from 'pages';

function Routes() {
    const { isAuthenticated } = useAuth();

    const privateRoutes = {
        element: <MainLayout />,
        children: [
            { path: '/listagem-de-livros', element: <BookList /> },
            { path: '/detalhes-do-livro', element: <BookDetails /> },
            { path: '/perfil-do-usuario/:idUser', element: <UserProfile /> },
            { path: '/reviews-do-usuario/:idUser', element: <UserReviews /> }
        ]
    };

    const publicRoutes = {
        element: <MainLayout />,
        children: [
            { path: '/home', element: <Home /> },
        ]
    };

    const routes = useMemo(() => {
        const aux = [
            publicRoutes,
            { path: '/', element: <Navigate to='/home' /> },
            { path: '*', element: <Navigate to='/home' /> },
        ];

        if (isAuthenticated) {
            aux.push(privateRoutes);
        }

        return aux;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    return useRoutes(routes);
}

export default Routes;
