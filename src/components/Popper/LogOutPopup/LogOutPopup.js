import { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from './LogOutPopup.module.scss';
import Button from '~/components/Button';
import { ModalContext } from '~/components/ModalProvider';
import { LoginContext } from '~/components/LoginProvider';
import { logout } from '~/services/loginService';
import { CloseIcon } from '~/components/Icons';
import { ThemeContext } from '~/components/Theme';

const cx = classNames.bind(styles);

function LogOutPopup() {
    const contextModal = useContext(ModalContext);
    const contextLogin = useContext(LoginContext);
    const contextTheme = useContext(ThemeContext);

    const [loading, setLoading] = useState(false);

    const fetchApi = async () => {
        setLoading(true);
        contextModal.setIsLogout(true);
        await logout();
        contextLogin.handleDeleteData();
        localStorage.removeItem('token');
        setTimeout(() => {
            contextModal.setIsLogout(false);
        }, 1000);
        setLoading(false);
    };

    return (
        <div className={cx('wrapper')} onClick={contextModal.handleHideModalLogOut}>
            {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
            <div className={cx('container')}>
                <div className={cx('close-btn')}>
                    <CloseIcon />
                </div>
                <div className={cx('title')}>
                    <span>Bạn có chắc chắn muốn đăng xuất?</span>
                </div>
                <div className={cx('wrapper-btn')}>
                    <Button text className={cx('cancel-btn')} onClick={contextModal.handleHideModalLogOut}>
                        Huỷ
                    </Button>
                    {contextTheme.isDark ? (
                        <Button outline className={cx('allow-btn')} onClick={fetchApi}>
                            Đăng xuất
                        </Button>
                    ) : (
                        <Button primary className={cx('allow-btn')} onClick={fetchApi}>
                            Đăng xuất
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LogOutPopup;
