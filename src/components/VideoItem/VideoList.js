import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './VideoItem.module.scss';
import VideoItem from './VideoItem';

const cx = classNames.bind(styles);

function VideoList({ data }) {
    return (
        <div>
            {data.map((video) => (
                <div key={video.id} className={cx('video-item')}>
                    <VideoItem idVideo={video.id} uuidVideo={video.uuid} data={video}>
                        {video.file_url}
                    </VideoItem>
                </div>
            ))}
        </div>
    );
}

VideoItem.propTypes = {
    data: PropTypes.array.isRequired,
};

export default VideoList;
