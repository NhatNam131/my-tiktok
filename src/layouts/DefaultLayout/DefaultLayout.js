import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './DefaultLayout.module.scss';
import Header from '../components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import { ModalContext } from '~/components/ModalProvider';
import { LoginContext } from '~/components/LoginProvider';
import { getCurrentUserService } from '~/services/userService';
import MenuModalItem from '~/components/MenuModalItem';
import LogOutPopup from '~/components/Popper/LogOutPopup/LogOutPopup';
import DetailVideo from '~/components/VideoItem/DetailVideo';
import { DetailVideoContext } from '~/components/VideoItem/DetailVideoProvider/DetailVideoProvider';
import { getDetailVideo } from '~/services/videoService';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const contextModal = useContext(ModalContext);
    const contextLogin = useContext(LoginContext);
    const contextDetailVideo = useContext(DetailVideoContext);
    const token = localStorage.getItem('token');

    const [data, setData] = useState();

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getDetailVideo(contextDetailVideo.uuidVideo);
            setData(result);
        };

        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contextDetailVideo.uuidVideo]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getCurrentUserService();
            if (result) {
                contextLogin.handleSetData(result);
            }
        };
        if (token) {
            fetchApi();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Header />
            {contextModal.isLogout && <span className={cx('notify')}>Đăng xuất thành công</span>}
            {contextLogin.isNotify && <span className={cx('notify')}>Đăng nhập thành công</span>}
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
            {contextModal.activeLogOut && <LogOutPopup />}
            {contextModal.active && <MenuModalItem />}
            {contextDetailVideo.isShow && <DetailVideo data={data} idVideo={contextDetailVideo.idVideoCurrent} />}
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
