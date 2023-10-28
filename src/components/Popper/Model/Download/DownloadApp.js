import classNames from 'classnames/bind';
import styles from './Download.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button/Button';
import { AppForPCIcon } from '~/components/Icons/Icons';

const cx = classNames.bind(styles);

function DownloadApp() {
    return (
        // Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                interactive
                offset={[-42, 19]}
                delay={[0, 500]}
                hideOnClick={false}
                placement="bottom"
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
        </div>
    );
}

export default DownloadApp;
