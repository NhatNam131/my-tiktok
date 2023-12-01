import { useContext } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Menu.module.scss';
import Button from '~/components/Button/Button';
import { ModalContext } from '~/components/ModalProvider';
import { ThemeContext } from '~/components/Theme';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    const contextModal = useContext(ModalContext);
    const contextTheme = useContext(ThemeContext);

    const classes = cx('menu-item', {
        seperate: data.seperate,
    });

    const toggleTheme = (e) => {
        if (e.target.checked) {
            contextTheme.setDarkMode();
        } else {
            contextTheme.setLightMode();
        }
    };

    const handleOnClick = () => {
        switch (data.title) {
            case 'Chế độ tối':
                break;
            case 'Đăng xuất':
                contextModal.handleShowModalLogOut();
                break;
            default:
                console.log('Error');
        }
    };

    return (
        <div className={cx('item-wrapper')}>
            <Button
                className={classes}
                leftIcon={data.icon}
                to={data.to}
                onClick={data.title === 'Tiếng Việt' ? onClick : handleOnClick}
            >
                {data.title}
                {data.title === 'Chế độ tối' && (
                    <div className={cx('checkbox-btn')}>
                        <input type="checkbox" id={styles.check} onChange={toggleTheme} />
                        <label htmlFor={styles.check} className={cx('dark-mode')}></label>
                    </div>
                )}
            </Button>
        </div>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
