import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import styles from './Video.module.scss';
import Search from '~/layouts/components/Search';

const cx = classNames.bind(styles);

function Video({ children }) {
    const videoRef = useRef();

    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [minutesLoad, setMinuteLoad] = useState(0);
    const [secondsLoad, setSecondsLoad] = useState(0);
    const [minutesTotal, setMinutesTotal] = useState(0);
    const [secondsTotal, setSecondsTotal] = useState(0);
    const [progress, setProgress] = useState(0);

    const handleTimeUpdate = (event) => {
        const video = event.target;
        const percent = (video.currentTime / video.duration) * 100;
        setCurrentTime(percent);
        setProgress(video.currentTime / video.duration);

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
    };

    const handlePauseVideo = () => {
        videoRef.current.pause();
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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-card')}>
                <video
                    autoPlay
                    onTimeUpdate={handleTimeUpdate}
                    ref={videoRef}
                    src={children}
                    onEnded={handleVideoEnded}
                    onClick={toggleVideo}
                ></video>
                <div className={cx('search')}>
                    <Search />
                </div>
                <div className={cx('play-pause')} onClick={toggleVideo}>
                    {!isPlaying && <FontAwesomeIcon icon={faPlay} />}
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
                        }${secondsLoad}/${minutesTotal}:${secondsTotal < 10 ? '0' : ''}${secondsTotal}`}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Video;
