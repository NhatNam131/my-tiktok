import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './Download.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button/Button';
import { AppForPCIcon } from '~/components/Icons/Icons';

const cx = classNames.bind(styles);

function DownloadApp() {
    return (
        // Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <Tippy
                interactive
                offset={[-42, 19]}
                delay={[0, 500]}
                hideOnClick={false}
                placement="bottom"
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('download-wrapper')}>
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
            </Tippy>
        </div>
    );
}

export default DownloadApp;
