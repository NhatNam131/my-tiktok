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
        const fetchApi = async () => {
            const result = await videoService.getVideoForYou('for-you', page);
            setVideoForYou((prev) => [...prev, ...result]);
        };

        fetchApi();
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
            <VideoList data={videoForYou} />
            <ButtonScrollToTop />
        </div>
    );
}

export default Home;
