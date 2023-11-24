import { useContext } from 'react';
import classNames from 'classnames/bind';

import styles from '../AuthForm.module.scss';
import Button from '~/components/Button';

import { ModalContext } from '~/components/ModalProvider';
import {
    AppleIcon,
    FacebookLoginIcon,
    GoogleIcon,
    KakaoTalkIcon,
    LineLoginIcon,
    QRIcon,
    TwitterRegularIcon,
    UserIcon,
} from '~/components/Icons';

const cx = classNames.bind(styles);

const loginList = {
    title: 'Đăng nhập vào TikTok',
    contents: [
        {
            id: 1,
            icon: <QRIcon />,
            title: 'Sử dụng mã QR',
        },
        {
            id: 2,
            icon: <UserIcon />,
            title: 'Số điện thoại / Email / TikTok ID',
        },
        {
            id: 3,
            icon: <FacebookLoginIcon />,
            title: 'Tiếp tục với Facebook',
        },
        {
            id: 4,
            icon: <GoogleIcon />,
            title: 'Tiếp tục với Google',
        },
        {
            id: 5,
            icon: <TwitterRegularIcon />,
            title: 'Tiếp tục với Twitter',
        },
        {
            id: 6,
            icon: <LineLoginIcon />,
            title: 'Tiếp tục với LINE',
        },
        {
            id: 7,
            icon: <KakaoTalkIcon />,
            title: 'Tiếp tục với KakaoTalk',
        },
        {
            id: 8,
            icon: <AppleIcon />,
            title: 'Tiếp tục với Apple',
        },
    ],
};

function LoginAuthForm() {
    const context = useContext(ModalContext);

    const handleSwitchForm = (id) => {
        if (id === 2) {
            context.handleChangeForm('loginform');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title-header')}>{loginList.title}</span>
            <div className={cx('list-button')}>
                {loginList.contents.map((item, index) => (
                    <Button key={index} className={cx('item-button')} onClick={() => handleSwitchForm(item.id)}>
                        <span className={cx('icon')}>{item.icon}</span>
                        <span className={cx('title')}>{item.title}</span>
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default LoginAuthForm;
