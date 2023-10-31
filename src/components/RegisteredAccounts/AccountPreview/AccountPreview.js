import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import styles from './AccountPreview.module.scss';

const cx = classNames.bind(styles);

function AccountPreview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    className={cx('avatar')}
                    src="https://kenh14cdn.com/thumb_w/660/203336854389633024/2023/4/29/photo-12-1682807977557298147398.png"
                    alt="Avatar"
                />
                <Button className={cx('follow-btn')} primary>
                    Theo dõi
                </Button>
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>nhatnamnguyen</strong>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>Nguyễn Nhất Nam</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>8.2M </strong>
                    <span className={cx('label')}>Người theo dõi</span>
                    <strong className={cx('value')}>3M </strong>
                    <span className={cx('label')}>Lượt thích</span>
                </p>
            </div>
        </div>
    );
}

export default AccountPreview;
