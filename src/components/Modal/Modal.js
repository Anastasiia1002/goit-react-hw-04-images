import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export default function Modal({ src, alt, toggleModal }) {
  // componentDidMount() {
  //   window.addEventListener('keydown', this.escapeFun);
  // }
  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.escapeFun);
  // }
  useEffect(() => {
    const escapeFun = e => {
      if (e.key === 'Escape') {
        toggleModal();
      }
    };
    window.addEventListener('keydown', escapeFun);
    return () => {
      window.removeEventListener('keydown', escapeFun);
    };
  }, [toggleModal]);

  const handleBackdrope = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return (
    <div className={css.overlay} onClick={handleBackdrope}>
      <div className={css.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
