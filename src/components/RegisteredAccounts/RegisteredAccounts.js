import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import AccountItem from './AccountItem';
import styles from './RegisteredAccounts.module.scss';

const cx = classNames.bind(styles);

function RegisteredAccounts({ label, data = [] }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {data.map((account) => (
                <AccountItem key={account.id} data={account} />
            ))}
            <p className={cx('more-btn')}>Xem thêm</p>
        </div>
    );
}

RegisteredAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
};

export default RegisteredAccounts;
