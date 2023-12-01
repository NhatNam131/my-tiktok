import { useContext } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faEarthAsia,
    faSort,
    faCircleDollarToSlot,
    faArrowRightFromBracket,
    faGear,
} from '@fortawesome/free-solid-svg-icons';
import { faMoon, faCirclePlay, faCircleQuestion, faUser, faBookmark } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';

import Button from '~/components/Button/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import config from '~/config';
import { MessageIcon, NotifycationIcon, UploadIcon } from '~/components/Icons';
import Image from '~/components/Images';
import Search from '../Search';
import DownloadApp from '~/components/Popper/Model/Download/DownloadApp';
import { ModalContext } from '~/components/ModalProvider';
import { LoginContext } from '~/components/LoginProvider';
import { ThemeContext } from '~/components/Theme';

const cx = classNames.bind(styles);

const MENU_ITEM = [
    {
        icon: <FontAwesomeIcon icon={faCirclePlay} />,
        title: 'Trung tâm Nhà sáng tạo LIVE',
    },
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Tiếng Việt',
        children: {
            title: 'Ngôn ngữ',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt (Việt Nam)',
                },
                {
                    type: 'language',
                    code: 'zh',
                    title: '中国',
                },
                {
                    type: 'language',
                    code: 'ja',
                    title: '日本',
                },
                {
                    type: 'language',
                    code: 'ko',
                    title: '한국어',
                },
                {
                    type: 'language',
                    code: 'lo',
                    title: 'ລາວ',
                },
                {
                    type: 'language',
                    code: 'la',
                    title: 'lingua latīna',
                },
                {
                    type: 'language',
                    code: 'pt',
                    title: 'Portugal',
                },
                {
                    type: 'language',
                    code: 'es',
                    title: 'España',
                },
                {
                    type: 'language',
                    code: 'sv',
                    title: 'Sverige',
                },
                {
                    type: 'language',
                    code: 'th',
                    title: 'ประเทศไทย',
                },
                {
                    type: 'language',
                    code: 'tr',
                    title: 'Türkiye',
                },
                {
                    type: 'language',
                    code: 'ru',
                    title: 'Россия',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Phản hồi và trợ giúp',
        to: '/',
    },
    {
        icon: <FontAwesomeIcon icon={faSort} />,
        title: 'Phím tắt trên bàn phím',
    },
    {
        icon: <FontAwesomeIcon icon={faMoon} />,
        title: 'Chế độ tối',
    },
];

function Header() {
    const contextModal = useContext(ModalContext);
    const contextLogin = useContext(LoginContext);
    const contextTheme = useContext(ThemeContext);

    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Xem hồ sơ',
            to: '/@nam',
        },
        {
            icon: <FontAwesomeIcon icon={faBookmark} />,
            title: 'Yêu thích',
        },
        {
            icon: <FontAwesomeIcon icon={faCircleDollarToSlot} />,
            title: 'Nhận xu',
            to: '/',
        },
        ...MENU_ITEM,
        { icon: <FontAwesomeIcon icon={faGear} />, title: 'Cài đặt', to: '/' },
        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            title: 'Đăng xuất',
            to: '/',
            seperate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    {contextTheme.isDark ? (
                        <img src={images.logodark} alt="Tiktok" />
                    ) : (
                        <img src={images.logo} alt="Tiktok" />
                    )}
                </Link>
                <Search />
                <div className={cx('actions')}>
                    {contextLogin.data ? (
                        <>
                            <Button text leftIcon={<UploadIcon />}>
                                Tải lên
                            </Button>
                            <DownloadApp />
                            <Tippy content="Tin nhắn" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy content="Hộp thư" placement="bottom">
                                <button className={cx('action-btn', 'notifycation-btn')}>
                                    <NotifycationIcon />
                                    <span className={cx('notifycation')}>10</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text leftIcon={<UploadIcon />} onClick={contextModal.handleShowModal}>
                                Tải lên
                            </Button>
                            <Button className={cx('login-btn')} primary onClick={contextModal.handleShowModal}>
                                Đăng nhập
                            </Button>
                            <DownloadApp />
                        </>
                    )}
                    {contextLogin.data && (
                        <Menu items={userMenu} onChange={handleMenuChange}>
                            <Image
                                className={cx('user-avatar')}
                                src={contextLogin.data.avatar}
                                alt={contextLogin.data.nickname}
                            />
                        </Menu>
                    )}
                    {!contextLogin.data && (
                        <Menu items={MENU_ITEM} onChange={handleMenuChange}>
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        </Menu>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
