import { lazy } from 'react';

import config from '../config';

const Search = lazy(() => import('../pages/Search'));

const publicRoutes = [
    {
        path: config.routes.search,
        component: Search,
    }
];


export { publicRoutes };
