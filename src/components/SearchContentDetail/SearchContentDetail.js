import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faHeartCrack } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-regular-svg-icons';

import styles from './SearchContentDetail.module.scss';
import { Wrapper as PopperWrapper } from '../Popper';
import { SearchSmallIcon } from '../Icons';

const cx = classNames.bind(styles);

function SearchContentDetail({ data }) {
    const moreSearchResult = [
        {
            icon: <FontAwesomeIcon icon={faFlag} />,
            title: 'Báo cáo',
            to: '',
        },
        {
            icon: <FontAwesomeIcon icon={faHeartCrack} />,
            title: 'Đánh dấu là không phù hợp',
            to: '',
        },
    ];

    const handleRenderMoreSearchResult = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper className={cx('more-popper')}>
                    {moreSearchResult.map((item) => (
                        <div className={cx('more-wrapper')}>
                            {item.icon}
                            <p className={cx('more-title')}>{item.title}</p>
                        </div>
                    ))}
                </PopperWrapper>
            </div>
        );
    };

    return (
        <Link className={cx('wrapper')}>
            <div className={cx('info')}>
                <h4 className={cx('content')}>
                    <SearchSmallIcon />
                    <span className={cx('content-item')}>{data.full_name}</span>
                    <HeadlessTippy
                        interactive
                        placement="bottom"
                        offset={[80, 25]}
                        delay={[0, 100]}
                        render={handleRenderMoreSearchResult}
                    >
                        <div>
                            <FontAwesomeIcon className={cx('more-menu')} icon={faEllipsis} />
                        </div>
                    </HeadlessTippy>
                </h4>
            </div>
        </Link>
    );
}

SearchContentDetail.propTypes = {
    data: PropTypes.object.isRequired,
};

export default SearchContentDetail;
