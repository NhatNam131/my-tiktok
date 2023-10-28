import PropTypes from 'prop-types';
import 'tippy.js/dist/tippy.css';

import './GlobalStyles.scss';

function GlobalStyles({ children }) {
    return children;
}

GlobalStyles.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GlobalStyles;
