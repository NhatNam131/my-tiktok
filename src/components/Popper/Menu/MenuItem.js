import { useContext } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Menu.module.scss';
import Button from '~/components/Button/Button';
import { ModalContext } from '~/components/ModalProvider';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    const contextModal = useContext(ModalContext);
    const classes = cx('menu-item', {
        seperate: data.seperate,
    });

    const handleOnClick = () => {
        if (data.title === 'Đăng xuất') {
            contextModal.handleShowModalLogOut();
        }
    };

    return (
        <Button className={classes} leftIcon={data.icon} to={data.to} onClick={handleOnClick}>
            {data.title}
        </Button>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
