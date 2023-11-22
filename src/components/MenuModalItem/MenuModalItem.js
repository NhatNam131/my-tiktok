import classNames from 'classnames/bind';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import styles from './MenuModalItem.module.scss';
import { ModalContext } from '~/components/ModalProvider';
import LoginAuthForm from '../AuthForm/LoginAuthForm';
import LoginForm from '../LoginForm';
import { CloseIcon } from '../Icons';

const cx = classNames.bind(styles);

function MenuModalItem() {
    const context = useContext(ModalContext);

    return (
        <div className={cx('modal-mask')}>
            {context.isRegister && <span className={cx('notify')}>Đăng ký tài khoản thành công</span>}
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    {context.typeForm === 'loginform' && (
                        <span className={cx('back-icon')} onClick={() => context.handleChangeForm('login')}>
                            <FontAwesomeIcon icon={faChevronLeft} className="fa-lg" />
                        </span>
                    )}
                    <div className={cx('inner')}>
                        {context.typeForm === 'loginform' && <LoginForm />}
                        {context.typeForm === 'login' && <LoginAuthForm />}
                    </div>

                    <div className={cx('keep-stable')}>
                        <div className={cx('policy')}>
                            {context.typeForm === 'login' && (
                                <p>
                                    Bằng cách tiếp tục, bạn đồng ý với{' '}
                                    <a
                                        className={cx('login-link')}
                                        href="https://www.tiktok.com/legal/terms-of-use?lang=en"
                                    >
                                        Điều khoản Sử dụng{' '}
                                    </a>
                                    của TikTok <br /> và xác nhận rằng bạn đã đọc hiểu{' '}
                                    <a
                                        className={cx('login-link')}
                                        href="https://www.tiktok.com/legal/privacy-policy?lang=en"
                                    >
                                        Chính sách quyền riêng tư{' '}
                                    </a>
                                    của TikTok.
                                </p>
                            )}
                        </div>
                        {context.typeForm === 'login' || context.typeForm === 'loginform' ? (
                            <div className={cx('footer')}>
                                Bạn không có tài khoản?
                                <span onClick={() => context.handleChangeForm('register')}>Đăng ký</span>
                            </div>
                        ) : (
                            <div className={cx('footer')}>
                                Bạn không có tài khoản?
                                <span
                                    onClick={() => {
                                        context.handleChangeForm('login');
                                    }}
                                >
                                    Đăng ký
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className={cx('close-btn')}
                    onClick={() => {
                        context.handleChangeForm('login');
                        context.handleHideModal();
                    }}
                >
                    <CloseIcon />
                </div>
            </div>
        </div>
    );
}

export default MenuModalItem;
