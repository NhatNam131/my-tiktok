import { useContext } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCheckCircle, faCommentDots, faHeart, faMusic, faShare } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './VideoItem.module.scss';
import Image from '~/components/Images/Images';
import Video from './CustomVideo';
import Button from '../Button';
import AccountPreview from '../RegisteredAccounts/AccountPreview';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import {
    ArrowDownIcon,
    DipIcon,
    EmailIcon,
    FacebookIcon,
    LineIcon,
    LinkedInIcon,
    LinkIcon,
    PinterestIcon,
    RedditIcon,
    SendIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsAppIcon,
} from '../Icons';
import { LoginContext } from '../LoginProvider';
import { ModalContext } from '../ModalProvider';

const cx = classNames.bind(styles);

function VideoItem({ data }) {
    require('moment/locale/vi');

    const contextModal = useContext(ModalContext);
    const contextLogin = useContext(LoginContext);

    const shareMenu = [
        {
            icon: <DipIcon />,
            title: 'Nhúng',
            to: '',
        },
        {
            icon: <SendIcon />,
            title: 'Gửi đến bạn bè',
            to: '',
        },
        {
            icon: <FacebookIcon />,
            title: 'Chia sẻ với Facebook',
            to: '',
        },
        {
            icon: <WhatsAppIcon />,
            title: 'Chia sẻ với WhatsApp',
            to: '',
        },
        {
            icon: <LinkIcon />,
            title: 'Sao chép liên kết',
        },
    ];

    const moreMenu = [
        ...shareMenu,
        {
            icon: <TwitterIcon />,
            title: 'Chia sẻ với Twitter',
            to: '',
        },
        {
            icon: <LinkedInIcon />,
            title: 'Chia sẻ với LinkedIn',
            to: '',
        },
        {
            icon: <RedditIcon />,
            title: 'Chia sẻ với Reddit',
            to: '',
        },
        {
            icon: <TelegramIcon />,
            title: 'Chia sẻ với Telegram',
            to: '',
        },
        {
            icon: <EmailIcon />,
            title: 'Chia sẻ với Email',
            to: '',
        },
        {
            icon: <LineIcon />,
            title: 'Chia sẻ với Line',
            to: '',
        },
        {
            icon: <PinterestIcon />,
            title: 'Chia sẻ với Pinterest',
            to: '',
        },
    ];

    const renderAccountPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview data={data.user} />
                </PopperWrapper>
            </div>
        );
    };

    const renderShareMoreButton = () => {};

    const renderShareButton = (props) => {
        return (
            <div className={cx('share')} tabIndex="-1" {...props}>
                <PopperWrapper>
                    {shareMenu.map((item) => (
                        <div className={cx('share-wrapper')}>
                            {item.icon}
                            <p className={cx('share-title')}>{item.title}</p>
                        </div>
                    ))}
                    <button className={cx('down-btn')} onClick={renderShareMoreButton}>
                        <ArrowDownIcon />
                    </button>
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <HeadlessTippy
                    interactive
                    placement="bottom-end"
                    offset={[255, 7]}
                    delay={[500, 0]}
                    render={renderAccountPreview}
                >
                    <Image className={cx('avatar')} src={data.user.avatar} alt={data.user.nickname} />
                </HeadlessTippy>
            </div>
            <div className={cx('right')}>
                <div className={cx('info')}>
                    <HeadlessTippy
                        interactive
                        placement="left-end"
                        offset={[225, -242]}
                        delay={[500, 0]}
                        render={renderAccountPreview}
                    >
                        <div>
                            <span className={cx('nickname')}>{data.user.nickname}</span>
                            {data.user.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                            <span className={cx('name')}>{`${data.user.first_name} ${data.user.last_name}`}</span>
                        </div>
                    </HeadlessTippy>
                    <div className={cx('public-time')}>
                        .
                        {` ${
                            moment(moment().toDate()).diff(moment(data.published_at), 'days') < 10
                                ? moment(data.published_at).startOf('minutes').fromNow()
                                : moment(data.published_at).format('MM-DD')
                        }`}
                    </div>
                    {contextLogin.data ? (
                        <Button className={cx('follow-btn')} outline>
                            Theo dõi
                        </Button>
                    ) : (
                        <Button className={cx('follow-btn')} outline onClick={contextModal.handleShowModal}>
                            Theo dõi
                        </Button>
                    )}
                </div>
                <p className={cx('description')}>{data.description}</p>
                <div className={cx('music')}>
                    {data.music && <FontAwesomeIcon className={cx('music-icon')} icon={faMusic} />}
                    <p className={cx('music-title')}>{data.music}</p>
                </div>
                <div className={cx('content')}>
                    <Video src={data.file_url} />
                    <div className={cx('interact-btn')}>
                        {/* Like button */}
                        <Button className={cx('react-btn')}>
                            <FontAwesomeIcon icon={faHeart} />
                        </Button>
                        <strong className={cx('react-count')}>{data.likes_count}</strong>

                        {/* Comment button */}
                        <Button className={cx('react-btn')}>
                            <FontAwesomeIcon icon={faCommentDots} />
                        </Button>
                        <strong className={cx('react-count')}>{data.comments_count}</strong>

                        {/* Favourite button */}
                        <Button className={cx('react-btn')}>
                            <FontAwesomeIcon icon={faBookmark} />
                        </Button>
                        <strong className={cx('react-count')}>0</strong>

                        {/* Share button */}
                        {/* Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context. */}
                        <div>
                            <HeadlessTippy
                                interactive
                                placement="top"
                                offset={[80, 0]}
                                delay={[0, 500]}
                                render={renderShareButton}
                            >
                                <div>
                                    <Button className={cx('react-btn')}>
                                        <FontAwesomeIcon icon={faShare} />
                                    </Button>
                                </div>
                            </HeadlessTippy>
                        </div>
                        <strong className={cx('react-count')}>{data.shares_count}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}

VideoItem.propTypes = {
    data: PropTypes.array,
};

export default VideoItem;
