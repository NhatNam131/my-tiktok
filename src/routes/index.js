import { HeaderOnLy } from '~/components/Layout';

import routesConfig from '~/config/routes';

import Home from '~/pages/Home';
import Search from '~/pages/Search';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';

// Public Routes
export const publicRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.search, component: Search, layout: null },
    { path: routesConfig.following, component: Following },
    { path: routesConfig.profile, component: Profile },
    { path: routesConfig.upload, component: Upload, layout: HeaderOnLy },
];

export const privateRoutes = [];
