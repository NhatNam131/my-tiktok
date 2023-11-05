import { faDungeon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Button from '../Button';
import AccountItem from './AccountItem';
import styles from './RegisteredAccounts.module.scss';

const cx = classNames.bind(styles);

function RegisteredAccounts({ label, data = [] }) {
    console.log(data);
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {data.map((account) => (
                <AccountItem key={account.id} data={account} />
            ))}
            <p className={cx('more-btn')}>Xem thêm</p>

            <Button className={cx('effect-btn')} text leftIcon={<FontAwesomeIcon icon={faDungeon} />}>
                Tạo hiệu ứng
            </Button>
        </div>
    );
}

RegisteredAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
};

export default RegisteredAccounts;
