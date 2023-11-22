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
                    title: 'Trung Quốc',
                },
                {
                    type: 'language',
                    code: 'ja',
                    title: 'Nhật Bản',
                },
                {
                    type: 'language',
                    code: 'ko',
                    title: 'Hàn Quốc',
                },
                {
                    type: 'language',
                    code: 'lo',
                    title: 'Lào',
                },
                {
                    type: 'language',
                    code: 'la',
                    title: 'Latin',
                },
                {
                    type: 'language',
                    code: 'pt',
                    title: 'Bồ Đào Nha',
                },
                {
                    type: 'language',
                    code: 'es',
                    title: 'Tây Ban Nha',
                },
                {
                    type: 'language',
                    code: 'sv',
                    title: 'Thuỵ Điển',
                },
                {
                    type: 'language',
                    code: 'th',
                    title: 'Thái Lan',
                },
                {
                    type: 'language',
                    code: 'tr',
                    title: 'Thổ Nhĩ Kỳ',
                },
                {
                    type: 'language',
                    code: 'ru',
                    title: 'Nga',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Phản hồi và trợ giúp',
        to: '/feedback',
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
            to: '/coin',
        },
        ...MENU_ITEM,
        { icon: <FontAwesomeIcon icon={faGear} />, title: 'Cài đặt', to: '/setting' },
        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            title: 'Đăng xuất',
            to: '/logout',
            seperate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <img src={images.logo} alt="Tiktok" />
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
                    <Menu items={contextLogin.data ? userMenu : MENU_ITEM} onChange={handleMenuChange}>
                        {contextLogin.data ? (
                            <Image
                                className={cx('user-avatar')}
                                src={contextLogin.data.avatar}
                                alt={contextLogin.data.nickname}
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
