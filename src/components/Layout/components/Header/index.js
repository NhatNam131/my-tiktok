import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faSpinner,
    faEllipsisVertical,
    faEarthAsia,
    faSort,
    faCircleDollarToSlot,
    faArrowRightFromBracket,
    faGear,
    faLaptop,
} from '@fortawesome/free-solid-svg-icons';

import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';

import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import images from '~/assets/images';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';

import { faMoon, faCirclePlay, faCircleQuestion, faUser, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { AppForPCIcon, MessageIcon, NotifycationIcon, SearchIcon, UploadIcon } from '~/components/Icons';
import Image from '~/components/Images';

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
    const [searchResult, setsearchResult] = useState([]);

    const currentUser = true;

    useEffect(() => {
        setTimeout(() => {
            setsearchResult([]);
        }, 0);
    });

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
                <img src={images.logo} alt="Tiktok" />
                <HeadlessTippy
                    interactive
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Tìm kiếm" spellCheck={false} />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                        <button className={cx('search-btn')}>
                            <SearchIcon />
                        </button>
                    </div>
                </HeadlessTippy>

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Button text leftIcon={<UploadIcon />}>
                                Tải lên
                            </Button>
                            <HeadlessTippy
                                interactive
                                offset={[-42, 19]}
                                delay={[0, 500]}
                                render={(attrs) => (
                                    <div className={cx('download-wrapper')} tabIndex="-1" {...attrs}>
                                        <PopperWrapper>
                                            <FontAwesomeIcon className={cx('download-image')} icon={faLaptop} />
                                            <p className={cx('download-content')}>Ứng dụng TikTok cho máy tính</p>
                                            <Button className={cx('download-btn')} primary>
                                                Tải về
                                            </Button>
                                        </PopperWrapper>
                                    </div>
                                )}
                            >
                                <button className={cx('action-btn', 'laptop')}>
                                    <AppForPCIcon />
                                </button>
                            </HeadlessTippy>
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
                            <Button text leftIcon={<UploadIcon />}>
                                Tải lên
                            </Button>
                            <Button primary>Đăng nhập</Button>
                            <HeadlessTippy
                                delay={[0, 500]}
                                interactive
                                offset={[-42, 19]}
                                render={(attrs) => (
                                    <div className={cx('download-wrapper')} tabIndex="-1" {...attrs}>
                                        <PopperWrapper>
                                            <FontAwesomeIcon className={cx('download-image')} icon={faLaptop} />
                                            <p className={cx('download-content')}>Ứng dụng TikTok cho máy tính</p>
                                            <Button className={cx('download-btn')} primary>
                                                Tải về
                                            </Button>
                                        </PopperWrapper>
                                    </div>
                                )}
                            >
                                <button className={cx('action-btn', 'laptop')}>
                                    <AppForPCIcon />
                                </button>
                            </HeadlessTippy>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEM} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://kenh14cdn.com/thumb_w/660/203336854389633024/2023/4/29/photo-12-1682807977557298147398.png"
                                alt="Nguyễn Nhất Nam"
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
