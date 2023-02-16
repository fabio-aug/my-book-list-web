import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

import { MainLayout } from 'layouts';

import {
    Home,
    BookList,
    UserProfile,
    BookDetails,
    UserReviews
} from 'pages';

function Routes() {
    const routes = useRoutes([
        {
            element: <MainLayout />,
            children: [
                { path: '/home', element: <Home /> },
                { path: '/listagem-de-livros', element: <BookList /> },
                { path: '/detalhes-do-livro', element: <BookDetails /> },
                { path: '/perfil-do-usuario/:idUser', element: <UserProfile /> },
                { path: '/reviews-do-usuario/', element: <UserReviews /> }
            ]
        },

        { path: '/', element: <Navigate to='/home' /> },
        { path: '*', element: <Navigate to='/home' /> },
        
    ]);

    return routes;
}

export default Routes;
