import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountPreviewDetailContent.module.scss';
import Image from '~/components/Images';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function AccountPreviewDetailContent({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image className={cx('avatar')} src={data && data.user.avatar} alt={data && data.user.nickname} />
                <Button primary className={cx('follow-btn')}>
                    Theo dõi
                </Button>
            </div>
            <div className={cx('body')}>
                <div className={cx('name-header')}>
                    <p className={cx('nickname')}>
                        <strong>{data && data.user.nickname}</strong>
                        {data && data.user.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                    </p>
                    <p className={cx('name')}>{`${data && data.user.last_name} ${data && data.user.first_name}`}</p>
                </div>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{data && data.user.followers_count}</strong>
                    <span className={cx('label')}>Người theo dõi</span>
                    <strong className={cx('value')}>{data && data.user.likes_count}</strong>
                    <span className={cx('label')}>Lượt thích</span>
                </p>
            </div>
            <div className={cx('bio')}>{data && data.user.bio}</div>
        </div>
    );
}

AccountPreviewDetailContent.propTypes = {
    data: PropTypes.array,
};

export default AccountPreviewDetailContent;
