import PropTypes from 'prop-types';
import VideoItem from './VideoItem';

function VideoList({ data = [] }) {
    return (
        <div>
            {data.map((video, index) => (
                <VideoItem key={index} data={video} />
            ))}
        </div>
    );
}

VideoItem.propTypes = {
    data: PropTypes.array.isRequired,
};

export default VideoList;
