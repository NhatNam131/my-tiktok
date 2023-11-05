import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import config from '~/config';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    DiscoverIcon,
    DiscoverActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import RegisteredAccounts from '~/components/RegisteredAccounts';
import Footer from '../Footer';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

function Sidebar() {
    // const [followingUsers, setFollowingUsers] = useState([]);
    const [suggestedUsers, setSuggestedUsers] = useState([]);

    useEffect(() => {
        userService
            .getSuggested({ page: 1, perPage: 10 })
            .then((data) => {
                setSuggestedUsers(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <aside className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Menu>
                    <MenuItem
                        title="Dành cho bạn"
                        to={config.routes.home}
                        icon={<HomeIcon />}
                        activeIcon={<HomeActiveIcon />}
                    />
                    <MenuItem
                        title="Đang Follow"
                        to={config.routes.following}
                        icon={<UserGroupIcon />}
                        activeIcon={<UserGroupActiveIcon />}
                    />
                    <MenuItem
                        title="Khám phá"
                        to={config.routes.discover}
                        icon={<DiscoverIcon />}
                        activeIcon={<DiscoverActiveIcon />}
                    />
                    <MenuItem
                        title="LIVE"
                        to={config.routes.live}
                        icon={<LiveIcon />}
                        activeIcon={<LiveActiveIcon />}
                    />
                </Menu>

                <RegisteredAccounts label="Các tài khoản đang follow" data={suggestedUsers} />

                <Footer />
            </div>
        </aside>
    );
}

export default Sidebar;
