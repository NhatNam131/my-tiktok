import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/svg-arrow.css';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    const renderMoreButton = (props) => {
        return (
            <div className={cx('more-popper')} tabIndex="-1" {...props}>
                <PopperWrapper>
                    <p className={cx('more-btn-content')}>NGUYÊN TẮC THỰC THI PHÁP LUẬT CỦA TIKTOK</p>
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('content')}>
                    <a href="/">Giới thiệu</a>
                    <a href="/">Bảng tin</a>
                    <a href="/">Liên hệ</a>
                    <a href="/">Sự nghiệp</a>
                </div>
                <div className={cx('content')}>
                    <a href="/">Tiktok for Good</a>
                    <a href="/">Quảng cáo</a>
                    <a href="/">Developer</a>
                    <a href="/">Minh bạch</a>
                    <a href="/">Tiktok Rewards</a>
                    <a href="/">Tiktok Embeds</a>
                </div>
                <div className={cx('content')}>
                    <a href="/">Trợ giúp</a>
                    <a href="/">An toàn</a>
                    <a href="/">Điều khoản</a>
                    <a href="/">Quyền riêng tư</a>
                    <a href="/">Cổng thông tin tác giả</a>
                    <a href="/">Hướng dẫn cộng đồng</a>
                </div>

                {/* Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context. */}
                <div>
                    <HeadlessTippy interactive placement="top" offset={[-15, 10]} render={renderMoreButton}>
                        <p className={cx('more-btn')}>Thêm</p>
                    </HeadlessTippy>
                </div>

                <p className={cx('content')}>@2023 by NhatNam</p>
            </div>
        </div>
    );
}

export default Footer;
