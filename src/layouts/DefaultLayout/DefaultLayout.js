import { useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './DefaultLayout.module.scss';
import Header from '../components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import { ModalContext } from '~/components/ModalProvider';
import { LoginContext } from '~/components/LoginProvider';
import { getCurrentUserService } from '~/services/userService';
import MenuModalItem from '~/components/MenuModalItem';

const cx = classNames.bind(styles);

function DefaultLayout({ children, data }) {
    const contextModal = useContext(ModalContext);
    const contextLogin = useContext(LoginContext);
    const token = localStorage.getItem('token');

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
            {contextLogin.isNotify && <span className={cx('notify')}>Đăng nhập thành công</span>}
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
            {contextModal.active && <MenuModalItem />}
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
