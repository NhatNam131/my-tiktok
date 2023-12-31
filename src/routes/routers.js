import { HeaderOnLy } from '~/layouts';

import config from '~/config';

import Home from '~/pages/Home';
import Search from '~/pages/Search';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Discover from '~/pages/Discover';
import Live from '~/pages/Live';

// Public Routes
export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.following, component: Following },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.upload, component: Upload, layout: HeaderOnLy },
    { path: config.routes.discover, component: Discover },
    { path: config.routes.live, component: Live },
];

export const privateRoutes = [];
