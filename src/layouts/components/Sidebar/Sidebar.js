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

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
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
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>

            <RegisteredAccounts label="Các tài khoản đang follow" />

            <Footer />
        </aside>
    );
}

export default Sidebar;
