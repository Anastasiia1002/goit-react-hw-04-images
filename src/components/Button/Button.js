import css from './Button.module.css';
import PropTypes from 'prop-types';
const Button = ({ loadMore }) => {
  return (
    <button type="button" onClick={() => loadMore()} className={css.Button}>
      <span>Load more</span>
    </button>
  );
};
export default Button;
Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
