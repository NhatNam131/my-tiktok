import { faDungeon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Button from '../Button';
import AccountItem from './AccountItem';
import styles from './RegisteredAccounts.module.scss';

const cx = classNames.bind(styles);

function RegisteredAccounts({ label }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            <AccountItem />
            <AccountItem />
            <AccountItem />
            <AccountItem />
            <AccountItem />
            <AccountItem />

            <p className={cx('more-btn')}>Xem thêm</p>

            <Button className={cx('effect-btn')} text leftIcon={<FontAwesomeIcon icon={faDungeon} />}>
                Tạo hiệu ứng
            </Button>
        </div>
    );
}

RegisteredAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default RegisteredAccounts;
