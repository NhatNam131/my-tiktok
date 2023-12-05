import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import * as videoService from '~/services/videoService';
import VideoList from '~/components/VideoItem/VideoList';
import ButtonScrollToTop from '~/components/Button/ButtonScrollToTop';

const cx = classNames.bind(styles);

function Home() {
    const [videoForYou, setVideoForYou] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        videoService
            .getVideoForYou({ type: 'for-you', page })
            .then((data) => {
                setVideoForYou((prev) => [...prev, ...data]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [page]);

    function handleScroll() {
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
            setPage((page) => page + 1);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <VideoList data={videoForYou.sort(() => 0.5 - Math.random())} />
            <ButtonScrollToTop />
        </div>
    );
}

export default Home;
