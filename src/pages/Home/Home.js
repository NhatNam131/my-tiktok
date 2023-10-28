import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    return <h2 className={cx('title-page')}>Home Page</h2>;
}

export default Home;
