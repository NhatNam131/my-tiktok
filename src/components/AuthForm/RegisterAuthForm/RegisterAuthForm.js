import { useContext } from 'react';
import classNames from 'classnames/bind';

import styles from '../AuthForm.module.scss';
import Button from '~/components/Button';
import {
    FacebookLoginIcon,
    GoogleIcon,
    KakaoTalkIcon,
    LineLoginIcon,
    TwitterRegularIcon,
    UserIcon,
} from '~/components/Icons';
import { ModalContext } from '~/components/ModalProvider';

const cx = classNames.bind(styles);

function RegisterAuthForm() {
    const registerList = {
        title: 'Đăng ký TikTok',
        contents: [
            {
                id: 1,
                icon: <UserIcon />,
                title: 'Sử dụng số điện thoại hoặc Email',
            },
            {
                icon: <FacebookLoginIcon />,
                title: 'Tiếp tục với Facebook',
            },
            {
                icon: <GoogleIcon />,
                title: 'Tiếp tục với Google',
            },
            {
                icon: <TwitterRegularIcon />,
                title: 'Tiếp tục với Twitter',
            },
            {
                icon: <LineLoginIcon />,
                title: 'Tiếp tục với LINE',
            },
            {
                icon: <KakaoTalkIcon />,
                title: 'Tiếp tục với KakaoTalk',
            },
        ],
    };

    const context = useContext(ModalContext);

    const handleSwitchForm = (id) => {
        if (id === 1) {
            context.handleChangeForm('registerform');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title-header')}>{registerList.title}</span>
            <div className={cx('list-button')}>
                {registerList.contents.map((item, index) => (
                    <Button key={index} white className={cx('item-button')} onClick={() => handleSwitchForm(item.id)}>
                        <span className={cx('icon')}>{item.icon}</span>
                        <span className={cx('title')}>{item.title}</span>
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default RegisterAuthForm;
