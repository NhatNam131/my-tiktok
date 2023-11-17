import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import styles from './Video.module.scss';

const cx = classNames.bind(styles);

function Video({ src }) {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    const handleVideoPress = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(false);
        } else {
            setTimeout(() => {
                videoRef.current.play();
                setPlaying(true);
            }, 500);
        }
    };

    return (
        <Waypoint onEnter={handleVideoPress} onLeave={handleVideoPress}>
            <video className={cx('video')} loop controls autoPlay muted ref={videoRef} src={src} />
        </Waypoint>
    );
}

Video.propTypes = {
    src: PropTypes.string,
};

export default Video;
