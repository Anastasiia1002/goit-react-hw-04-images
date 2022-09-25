import React from 'react';
import css from './ImageGalleryItems.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, toggleModal }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        onClick={() => toggleModal(image.largeImageURL, image.user)}
        src={image.webformatURL}
        alt={image.user}
        data-large={image.largeImageURL}
        className={css.image}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.PropTypes.shape({
    webformatURL: PropTypes.string,
    user: PropTypes.string,
    largeImageURL: PropTypes.string,
  }).isRequired,
  toggleModal: PropTypes.func.isRequired,
};
