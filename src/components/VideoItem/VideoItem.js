import { useState, useContext, useMemo, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCheckCircle, faCommentDots, faHeart, faMusic, faShare } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './VideoItem.module.scss';
import Image from '~/components/Images/Images';
import { VideoContext } from './CustomVideo';
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
    MuteIcon,
    PauseIcon,
    PinterestIcon,
    PLayIcon,
    RedditIcon,
    SendIcon,
    TelegramIcon,
    TwitterIcon,
    VolumeIcon,
    WhatsAppIcon,
} from '../Icons';
import { LoginContext } from '../LoginProvider';
import { ModalContext } from '../ModalProvider';

const cx = classNames.bind(styles);

function VideoItem({ data, children }) {
    require('moment/locale/vi');
    const videoRef = useRef();
    const myRef = useRef();

    const contextModal = useContext(ModalContext);
    const contextLogin = useContext(LoginContext);
    const contextVideo = useContext(VideoContext);

    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [minutesLoad, setMinuteLoad] = useState(0);
    const [secondsLoad, setSecondsLoad] = useState(0);
    const [minutesTotal, setMinutesTotal] = useState(0);
    const [secondsTotal, setSecondsTotal] = useState(0);
    const [myElementIsVisible, setMyElementIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            setMyElementIsVisible(entry.isIntersecting);
        });
        observer.observe(myRef.current);

        if (myElementIsVisible && videoRef.current) {
            setIsPlaying(true);
            videoRef.current.play();
        } else if (!myElementIsVisible && videoRef.current) {
            setIsPlaying(false);
            videoRef.current.pause();
        }
    }, [myElementIsVisible]);

    useEffect(() => {
        if (contextVideo.isMute) {
            videoRef.current.volume = 0;
        } else {
            videoRef.current.volume = contextVideo.volume;
        }
    }, [contextVideo.isMute, contextVideo.volume]);

    useEffect(() => {
        const interval = setInterval(() => {
            const timeLoad = videoRef.current.currentTime;
            const minutesLoad = Math.floor(timeLoad / 60);
            setMinuteLoad(minutesLoad);
            const secondsLoad = Math.floor(timeLoad % 60);
            setSecondsLoad(secondsLoad);
            const totalTime = videoRef.current.duration;
            const minutesTotal = Math.floor(totalTime / 60);
            setMinutesTotal(minutesTotal);
            const secondsTotal = Math.floor(totalTime % 60);
            setSecondsTotal(secondsTotal);
        }, 1000); // Cập nhật thời gian mỗi giây

        return () => clearInterval(interval);
    }, []);

    const handleTimeUpdate = (event) => {
        const video = event.target;
        const percent = (video.currentTime / video.duration) * 100;
        setCurrentTime(percent);
        setProgress(video.currentTime / video.duration);
    };

    const handleSetTimeVideo = (event) => {
        const percent = parseFloat(event.target.value);
        const time = (videoRef.current.duration / 100) * percent;
        videoRef.current.currentTime = time;
        setCurrentTime(percent);
        setProgress(videoRef.current.currentTime / videoRef.current.duration);
    };

    const handlePLayVideo = () => {
        videoRef.current.play();
        console.log(videoRef.current.play());
    };

    const handlePauseVideo = () => {
        videoRef.current.pause();
        setIsPlaying(false);
    };

    const toggleVideo = () => {
        if (isPlaying) {
            handlePauseVideo();
            setIsPlaying(false);
        } else {
            handlePLayVideo();
            setIsPlaying(true);
        }
    };

    const handleVideoEnded = () => {
        videoRef.current.play();
    };

    const handleVolumeChange = (e) => {
        videoRef.current.volume = e.target.value;
    };

    const shareMenu = useMemo(
        () => [
            {
                showMore: true,
                contents: [
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
                ],
            },
            {
                contents: [
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
                ],
            },
        ],
        [],
    );

    const [formType, setFormType] = useState(shareMenu[0]);

    const renderAccountPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview data={data.user} />
                </PopperWrapper>
            </div>
        );
    };

    const handleRenderMoreShareMenu = () => {
        setFormType(shareMenu[1]);
    };

    const handleReset = () => {
        setFormType(shareMenu[0]);
    };

    const renderShareButton = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper className={cx('share-popper')}>
                    {formType.contents.map((item) => (
                        <div className={cx('share-wrapper')}>
                            {item.icon}
                            <p className={cx('share-title')}>{item.title}</p>
                        </div>
                    ))}
                    {formType.showMore && (
                        <button className={cx('down-btn')} onClick={handleRenderMoreShareMenu}>
                            <ArrowDownIcon />
                        </button>
                    )}
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
                    <div ref={myRef} className={cx('video-card')}>
                        <video
                            onClick={() => {}}
                            onTimeUpdate={handleTimeUpdate}
                            ref={videoRef}
                            src={children}
                            onEnded={handleVideoEnded}
                        ></video>
                        <div className={cx('controls')}>
                            <div className={cx('play-pause')} onClick={toggleVideo}>
                                {isPlaying ? <PLayIcon /> : <PauseIcon />}
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
                            <div className={cx('progress-time')}>
                                <div className={cx('time-video')}>
                                    <div className={cx('control-time')}>
                                        <input
                                            id={styles.progress}
                                            className={cx('range')}
                                            type="range"
                                            value={currentTime}
                                            step="0.1"
                                            min="0"
                                            max="100"
                                            onInput={handleSetTimeVideo}
                                        />
                                        <label
                                            htmlFor={styles.progress}
                                            className={cx('range-progess')}
                                            style={{ transform: `scaleX(${progress}) translateY(-50%)` }}
                                        ></label>
                                    </div>

                                    <div className={cx('timeon')}>{`${minutesLoad}:${
                                        secondsLoad < 10 ? '0' : ''
                                    }${secondsLoad}/${minutesTotal}:${
                                        secondsTotal < 10 ? '0' : ''
                                    }${secondsTotal}`}</div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                onHide={handleReset}
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
