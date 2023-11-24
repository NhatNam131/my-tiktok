import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from './RegisterForm.module.scss';
import Button from '~/components/Button';
import { HidePasswordIcon, ShowPasswordIcon } from '~/components/Icons';
import { LoginContext } from '~/components/LoginProvider';
import { ModalContext } from '~/components/ModalProvider';
import { register } from '~/services/registerService';

const cx = classNames.bind(styles);

function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [isShowRe, setIsShowRe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rePassWord, setRePassWord] = useState('');
    const [checkPass, setCheckPass] = useState(false);

    const hasSpace = password.includes(' ');
    const pattern = /\S/;

    const contextLogin = useContext(LoginContext);
    const contextModal = useContext(ModalContext);

    const handleSubmit = () => {
        if (rePassWord === password) {
            const fetchApi = async () => {
                setLoading(true);
                const result = await register(email, password);
                if (result) {
                    setLoading(false);
                    contextModal.setIsRegister(true);
                    setTimeout(() => {
                        contextModal.setIsRegister(false);
                    }, 2200);
                } else {
                    contextLogin.setShowErrorRegister(true);
                }
                setLoading(false);
            };

            fetchApi();
        } else {
            setCheckPass(true);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !hasSpace && pattern.test(email) && pattern.test(password)) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleChangePassWord = (e) => {
        setPassword(e.target.value);
        contextLogin.setShowErrorRegister(false);
        setCheckPass(false);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        contextLogin.setShowErrorRegister(false);
    };

    const handleRePassWord = (e) => {
        contextLogin.setShowErrorRegister(false);
        setRePassWord(e.target.value);
        setCheckPass(false);
    };

    useEffect(() => {
        if (!hasSpace && pattern.test(email) && pattern.test(password)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, password]);

    return (
        <div className={cx('wrapper')}>
            {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
            <div className={cx('title')}>Đăng ký</div>

            <div className={cx('content')}>
                <div className={cx('title-input')}>
                    <span className={cx('title-email')}>Email</span>
                    <span className={cx('title-phone')}>Đăng ký bằng số điện thoại</span>
                </div>

                <div className={cx('form')}>
                    <div className={cx('input-data')}>
                        <input
                            type="email"
                            onKeyDown={handleKeyPress}
                            onChange={handleChangeEmail}
                            placeholder="Địa chỉ Email"
                        ></input>
                    </div>

                    <div className={cx('input-data')}>
                        <input
                            onKeyDown={handleKeyPress}
                            type={isShow ? 'text' : 'password'}
                            onChange={handleChangePassWord}
                            placeholder="Mật khẩu"
                        />

                        {!isShow ? (
                            <span onClick={() => setIsShow(true)} className={cx('show-password')}>
                                <HidePasswordIcon />
                            </span>
                        ) : (
                            <span onClick={() => setIsShow(false)} className={cx('show-password')}>
                                <ShowPasswordIcon />
                            </span>
                        )}
                    </div>
                    <div className={cx('input-data')}>
                        <input
                            type={isShowRe ? 'text' : 'password'}
                            onChange={handleRePassWord}
                            placeholder="Nhập lại mật khẩu"
                        />
                        {!isShowRe ? (
                            <span onClick={() => setIsShowRe(true)} className={cx('show-password')}>
                                <HidePasswordIcon />
                            </span>
                        ) : (
                            <span onClick={() => setIsShowRe(false)} className={cx('show-password')}>
                                <ShowPasswordIcon />
                            </span>
                        )}
                    </div>
                    {contextLogin.showErrorRegister && (
                        <span className={cx('invalid')}>
                            Địa chỉ email đã được sử dụng, vui lòng nhập địa chỉ email khác
                        </span>
                    )}
                    {checkPass && <span className={cx('invalid')}>Mật khẩu không khớp, vui lòng thử lại</span>}
                    {hasSpace && <span className={cx('invalid')}>Ký tự đặc biệt không hợp lệ</span>}

                    <Button disabled={disabled} primary className={cx('button-login')} onClick={handleSubmit}>
                        Đăng ký
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
