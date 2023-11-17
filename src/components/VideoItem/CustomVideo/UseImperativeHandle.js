import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './UseImperativeHandle.module.scss';
import Video from './Video';

const cx = classNames.bind(styles);

function UseImperativeHandle({ src, muted }) {
    return (
        <div className={cx('wrapper')}>
            <Video src={src} />
        </div>
    );
}

UseImperativeHandle.propTypes = {
    src: PropTypes.string,
};

export default UseImperativeHandle;
