import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import * as videoService from '~/services/videoService';
import VideoList from '~/components/VideoItem/VideoList';
import ButtonScrollToTop from '~/components/Button/ButtonScrollToTop';

const cx = classNames.bind(styles);

function Home() {
    const [videoForYou, setVideoForYou] = useState([]);

    useEffect(() => {
        videoService
            .getVideoForYou({ type: 'for-you', page: 1 })
            .then((data) => {
                setVideoForYou(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <VideoList data={videoForYou.sort(() => 0.5 - Math.random())} />
            <ButtonScrollToTop />
        </div>
    );
}

export default Home;
