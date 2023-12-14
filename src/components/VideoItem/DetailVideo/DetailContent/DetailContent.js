import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faMusic } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import styles from './DetailContent.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Image from '~/components/Images/Images';
import Button from '~/components/Button';
import AccountPreviewDetailContent from '~/components/RegisteredAccounts/AccountPreviewDetailContent';

const cx = classNames.bind(styles);

function DetailContent({ data }) {
    require('moment/locale/vi');
    const [isFollow, setIsFollow] = useState();

    const renderPreview = (props) => (
        <div tabIndex="-1" {...props}>
            <PopperWrapper className={cx('menu-popper')}>
                <AccountPreviewDetailContent data={data} />
            </PopperWrapper>
        </div>
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('item-info')}>
                <div>
                    <HeadlessTippy
                        delay={[800, 500]}
                        offset={[-30, 5]}
                        interactive
                        placement="bottom"
                        render={renderPreview}
                    >
                        <div className={cx('user-info')}>
                            <Image
                                className={cx('avatar')}
                                src={data && data.user.avatar}
                                alt={data && data.user.nickname}
                            />
                            <p className={cx('name-header')}>
                                <Link className={cx('nickname')} to={`@${data && data.user.nickname}`}>{`${
                                    data && data.user.nickname
                                }`}</Link>
                                {data && data.user.tick && (
                                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                                )}
                                <span className={cx('fullname')}>
                                    {`${data && data.user.last_name} ${data && data.user.first_name} . ${
                                        data && data.published_at
                                            ? moment(moment().toDate()).diff(moment(data.published_at), 'days') < 10
                                                ? moment(data.published_at).startOf('minutes').fromNow()
                                                : moment(data.published_at).format('MM-DD')
                                            : null
                                    }`}
                                </span>
                            </p>
                        </div>
                    </HeadlessTippy>
                    <div className={cx('button')}>
                        {!isFollow && (
                            <Button className={cx('button-follow')} primary onClick={() => setIsFollow(true)}>
                                Theo dõi
                            </Button>
                        )}
                        {isFollow && (
                            <Button className={cx('button-following')} text onClick={() => setIsFollow(false)}>
                                Đang theo dõi
                            </Button>
                        )}
                    </div>
                </div>
                <p className={cx('description')}>{data && data.description}</p>
                <Link to="/music">
                    <span className={cx('music-icon')}>
                        <FontAwesomeIcon icon={faMusic} />
                        {data && data.music
                            ? ` ${data.music}`
                            : ` Âm thanh gốc - ${data && data.user.last_name} ${data && data.user.first_name}`}
                    </span>
                </Link>
            </div>
        </div>
    );
}

DetailContent.propTypes = {
    data: PropTypes.array,
};

export default DetailContent;
