import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const DetailVideoContext = createContext();

function DetailVideoProvider({ children }) {
    const [isShow, setIsShow] = useState(false);
    const [currentLink, setCurrentLink] = useState();
    const [idVideoCurrent, setIdVideoCurrent] = useState();
    const [isWatch, setIsWatch] = useState(false);
    const [uuidVideo, setUiidVideo] = useState();

    const body = document.body;

    const handleShowDetail = () => {
        body.classList.add('hidden');
        setIsShow(true);
    };

    const handleHideDetail = () => {
        body.classList.remove('hidden');
        setIsShow(false);
    };

    const handleSetLink = (link) => {
        setCurrentLink(link);
    };

    const handleShowWatchDetail = () => {
        body.classList.add('hidden');
        setIsWatch(true);
    };

    const handleHideWatchDetail = () => {
        body.classList.remove('hidden');
        setIsWatch(false);
    };

    const value = {
        handleShowDetail,
        handleHideDetail,
        handleSetLink,
        setIdVideoCurrent,
        handleShowWatchDetail,
        handleHideWatchDetail,
        setUiidVideo,
        idVideoCurrent,
        currentLink,
        isShow,
        isWatch,
        uuidVideo,
    };

    return <DetailVideoContext.Provider value={value}>{children}</DetailVideoContext.Provider>;
}

DetailVideoProvider.propTypes = {
    children: PropTypes.string.isRequired,
};

export default DetailVideoProvider;
