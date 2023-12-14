import { useState, useContext, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import {
    faBookmark,
    faCommentDots,
    faHeart,
    faChevronDown,
    faEllipsis,
    faShare,
    faHeartCrack,
} from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-regular-svg-icons';

import styles from './DetailVideo.module.scss';
import Video from '~/components/VideoItem/Video';
import Button from '~/components/Button';
import {
    CloseSmallIcon,
    DipSmallIcon,
    EmailSmallIcon,
    FacebookSmallIcon,
    LineSmallIcon,
    LinkedInSmallIcon,
    PinterestSmallIcon,
    RedditSmallIcon,
    SendSmallIcon,
    TelegramSmallIcon,
    TwitterSmallIcon,
    WhatsAppSmallIcon,
} from '~/components/Icons';
import DetailContent from './DetailContent';
import { DetailVideoContext } from '../DetailVideoProvider/DetailVideoProvider';
import { getDetailVideo } from '~/services/videoService';
import { VideoContext } from '../CustomVideo';
import { MuteIcon, VolumeIcon } from '~/components/Icons';
import Image from '~/components/Images/Images';
import SearchDetailVideo from '~/layouts/components/Search/SearchDetailVideo';

const cx = classNames.bind(styles);

function DetailVideo({ data, idVideo }) {
    const videoRef = useRef();
    const contextDetail = useContext(DetailVideoContext);
    const contextVideo = useContext(VideoContext);

    const [itemOverlay, setItemOverlay] = useState();

    const moreVideo = [
        {
            icon: <FontAwesomeIcon icon={faHeartCrack} />,
            title: 'Không quan tâm',
            to: '',
        },
        {
            icon: <FontAwesomeIcon icon={faFlag} />,
            title: 'Báo cáo',
            to: '',
        },
    ];

    const shareMenu = [
        {
            icon: <LinkedInSmallIcon />,
            title: 'Chia sẻ với LinkedIn',
            to: '',
        },
        {
            icon: <RedditSmallIcon />,
            title: 'Chia sẻ với Reddit',
            to: '',
        },
        {
            icon: <TelegramSmallIcon />,
            title: 'Chia sẻ với Telegram',
            to: '',
        },
        {
            icon: <EmailSmallIcon />,
            title: 'Chia sẻ với Email',
            to: '',
        },
        {
            icon: <LineSmallIcon />,
            title: 'Chia sẻ với Line',
            to: '',
        },
        {
            icon: <PinterestSmallIcon />,
            title: 'Chia sẻ với Pinterest',
            to: '',
        },
    ];

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getDetailVideo(contextDetail.uuidVideo);
            setItemOverlay(result);
        };

        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (contextVideo.isMute) {
            videoRef.current.volume = 0;
        } else {
            videoRef.current.volume = contextVideo.volume;
        }
    }, [contextVideo.isMute, contextVideo.volume]);

    const handleVolumeChange = (e) => {
        videoRef.current.volume = e.target.value;
    };

    const handleRenderMoreVideo = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper className={cx('more-popper')}>
                    {moreVideo.map((item) => (
                        <div className={cx('more-wrapper')}>
                            {item.icon}
                            <p className={cx('more-title')}>{item.title}</p>
                        </div>
                    ))}
                </PopperWrapper>
            </div>
        );
    };

    const handleRenderShareMenu = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper className={cx('share-popper')}>
                    {shareMenu.map((item) => (
                        <div className={cx('share-wrapper')}>
                            {item.icon}
                            <p className={cx('share-title')}>{item.title}</p>
                        </div>
                    ))}
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div className={cx('detail-mask')}>
            <div className={cx('wrapper')}>
                <div ref={videoRef} className={cx('video')}>
                    <Image className={cx('thumb-video')} src={data && data.thumb_url} />
                    <div className={cx('mask-for-thumb')}></div>
                    <div className={cx('close-btn')} onClick={contextDetail.handleHideDetail}>
                        <CloseSmallIcon />
                    </div>
                    <HeadlessTippy
                        interactive
                        placement="bottom"
                        offset={[602, -300]}
                        delay={[0, 100]}
                        render={handleRenderMoreVideo}
                    >
                        <div>
                            <Button className={cx('more-video-btn')}>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </Button>
                        </div>
                    </HeadlessTippy>
                    <div className={cx('search-video-detail')}>
                        <SearchDetailVideo />
                    </div>
                    <Video>{contextDetail.currentLink}</Video>
                    <div className={cx('next-video-btn')}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                    <div className={cx('controls-volume')}>
                        <div className={cx('change-volume')}>
                            <input
                                className={cx('range')}
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={contextVideo.volume}
                                onChange={(e) => {
                                    contextVideo.handleVolume(e);
                                    handleVolumeChange(e);
                                }}
                            />
                        </div>
                        <div className={cx('sound-mute')} onClick={contextVideo.toggleMuted}>
                            {contextVideo.isMute && (
                                <span className={cx('mute-icon')}>
                                    <MuteIcon />
                                </span>
                            )}

                            {!contextVideo.isMute && (
                                <span className={cx('volume-icon')}>
                                    <VolumeIcon />
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className={cx('right-side')}>
                    <div className={cx('desc')}>
                        <DetailContent data={itemOverlay} />
                        <div className={cx('interact-btn')}>
                            {/* Like button */}
                            <div className={cx('btn')}>
                                <Button className={cx('react-btn')}>
                                    <FontAwesomeIcon icon={faHeart} />
                                </Button>
                                <strong className={cx('react-count')}>{data && data.likes_count}</strong>
                            </div>

                            {/* Comment button */}
                            <div className={cx('btn')}>
                                <Button className={cx('react-btn', 'comment-btn')}>
                                    <FontAwesomeIcon icon={faCommentDots} />
                                </Button>
                                <strong className={cx('react-count')}>{data && data.comments_count}</strong>
                            </div>

                            {/* Favourite button */}
                            <div className={cx('btn')}>
                                <Button className={cx('react-btn')}>
                                    <FontAwesomeIcon icon={faBookmark} />
                                </Button>
                                <strong className={cx('react-count')}>0</strong>
                            </div>
                            <div className={cx('share')}>
                                <Tippy content="Nhúng" placement="top">
                                    <button className={cx('action-btn')}>
                                        <DipSmallIcon />
                                    </button>
                                </Tippy>
                                <Tippy content="Gửi đến bạn bè" placement="top">
                                    <button className={cx('action-btn')}>
                                        <SendSmallIcon />
                                    </button>
                                </Tippy>
                                <Tippy content="Chia sẻ với Facebook" placement="top">
                                    <button className={cx('action-btn')}>
                                        <FacebookSmallIcon />
                                    </button>
                                </Tippy>
                                <Tippy content="Chia sẻ với WhatsApp" placement="top">
                                    <button className={cx('action-btn')}>
                                        <WhatsAppSmallIcon />
                                    </button>
                                </Tippy>
                                <Tippy content="Chia sẻ với Twitter" placement="top">
                                    <button className={cx('action-btn')}>
                                        <TwitterSmallIcon />
                                    </button>
                                </Tippy>
                                <div>
                                    <HeadlessTippy
                                        interactive
                                        placement="bottom"
                                        offset={[-100, 0]}
                                        delay={[0, 200]}
                                        render={handleRenderShareMenu}
                                    >
                                        <div>
                                            <Button className={cx('action-btn', 'share-btn')}>
                                                <FontAwesomeIcon icon={faShare} />
                                            </Button>
                                        </div>
                                    </HeadlessTippy>
                                </div>
                            </div>
                        </div>
                        <div className={cx('link-copy')}>
                            <p className={cx('link')}>{data && data.file_url}</p>
                            <Button className={cx('link-copy-btn')}>Sao chép liên kết</Button>
                        </div>
                    </div>
                    <div className={cx('comment')}>
                        <div className={cx('wrapper-comment')}>
                            <span className={cx('be-first')}>Hãy là người đầu tiên bình luận!</span>
                        </div>
                    </div>
                    <div className={cx('add-comment')}>
                        <div className={cx('input-data')}>
                            <input type="text" placeholder="Thêm bình luận..."></input>
                        </div>
                        <div>
                            <Button className={cx('btn-post-comment')}>Đăng</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailVideo;
