import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import { faDungeon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
import Button from '~/components/Button';
import { ModalContext } from '~/components/ModalProvider';
import { LoginContext } from '~/components/LoginProvider';

const cx = classNames.bind(styles);

function Sidebar() {
    const contextModal = useContext(ModalContext);
    const contextLogin = useContext(LoginContext);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);

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

    useEffect(() => {
        userService
            .getFollowing({ page: 1 })
            .then((data) => {
                setFollowingUsers(data);
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

                {contextLogin.data ? (
                    <>
                        <RegisteredAccounts label="Các tài khoản được đề xuất" data={suggestedUsers} />
                        <RegisteredAccounts label="Các tài khoản đang follow" data={followingUsers} />
                    </>
                ) : (
                    <div className={cx('login-wrapper')}>
                        <p className={cx('login-content')}>
                            Đăng nhập để follow các tác giả, thích video và xem bình luận.
                        </p>
                        <Button className={cx('login-btn')} outline onClick={contextModal.handleShowModal}>
                            Đăng nhập
                        </Button>
                    </div>
                )}

                <Button className={cx('effect-btn')} text leftIcon={<FontAwesomeIcon icon={faDungeon} />}>
                    Tạo hiệu ứng
                </Button>

                <Footer />
            </div>
        </aside>
    );
}

export default Sidebar;
