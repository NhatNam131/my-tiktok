import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const VideoContext = createContext();

function VideoProvider({ children }) {
    const [volume, setVolume] = useState(0.4);
    const [prevVolume, setPreVolume] = useState(volume);
    const [isMute, setIsMute] = useState(true);

    const handleVolume = (e) => {
        const volume = e.target.value;
        if (volume === '0') {
            setVolume(0);
            setIsMute(true);
        } else {
            setVolume(volume);
            setIsMute(false);
        }
    };

    const toggleMute = () => {
        if (isMute) {
            setVolume(prevVolume);
            setIsMute(false);
        } else {
            setPreVolume(volume);
            setVolume(0);
            setIsMute(true);
        }
    };

    const value = { volume, isMute, handleVolume, toggleMute };

    return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
}

VideoProvider.propTypes = {
    children: PropTypes.string.isRequired,
};

export default VideoProvider;
