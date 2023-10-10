import { HeaderOnLy } from '~/components/Layout';

import Home from '~/pages/Home';
import Search from '~/pages/Search';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';

// Public Routes
export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/search', component: Search, layout: null },
    { path: '/following', component: Following },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnLy },
];

export const privateRoutes = [];
