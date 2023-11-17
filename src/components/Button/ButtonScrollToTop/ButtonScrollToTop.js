import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './ButtonScrollToTop.module.scss';
import { OnTopIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function ButtonScrollToTop() {
    const [scrollToTop, setScrollToTop] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setScrollToTop(true);
            } else {
                setScrollToTop(false);
            }
        });
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div>
            {scrollToTop && (
                <button onClick={handleScrollToTop}>
                    <OnTopIcon className={cx('on-top-btn')} />
                </button>
            )}
        </div>
    );
}

export default ButtonScrollToTop;
