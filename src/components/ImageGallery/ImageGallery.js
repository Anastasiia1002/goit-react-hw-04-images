import { useEffect, useState } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import apiImages from '../../utils/searchImages';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function ImageGallery({ searchN, pageN, loadMore }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  // const [search, setSearch] = useState('');
  const [status, setStatus] = useState(Status.IDLE);
  const [showModal, setShowModal] = useState(false);
  const [largeImageId, setLargeImageId] = useState('');
  const [largeImageIdUser, setLargeImageIdUser] = useState('');

  // useEffect(() => {
  //   if (!searchN) {
  //     return;
  //   }
  //   setStatus(Status.PENDING);
  //   apiImages
  //     .searchImages(searchN)
  //     .then(
  //       images => setImages(prevImg => [...images]),
  //       setStatus(Status.RESOLVED)
  //     )
  //     .catch(error => {
  //       setError(error);
  //       setStatus(Status.REJECTED);
  //     });
  // }, [searchN]);

  useEffect(() => {
    // if (pageN === 1) {
    //   return;
    // }
    if (!searchN) {
      return;
    }
    setStatus(Status.PENDING);
    apiImages
      .searchImages(searchN, pageN)
      .then(
        images => setImages(prevImg => [...prevImg, ...images]),
        setStatus(Status.RESOLVED)
      )
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [pageN, searchN]);

  //  componentDidUpdate(prevProps, prevState) {
  // const prevSearch = prevProps.search;
  // const nextSearch = this.props.search;

  //   if (prevSearch !== nextSearch) {
  //     this.setState({ status: Status.PENDING });

  //     apiImages
  //       .searchImages(nextSearch, this.props.page)
  //       .then(images =>
  //         this.setState(prev => ({
  //           images: [...images],
  //           status: Status.RESOLVED,
  //         }))
  //       )
  //       .catch(error => this.setState({ error, status: Status.REJECTED }));
  //   }
  //   if (prevProps.page !== this.props.page && this.props.page !== 1) {
  //     apiImages
  //       .searchImages(nextSearch, this.props.page)
  //       .then(images =>
  //         this.setState(prev => ({
  //           images: [...prev.images, ...images],
  //           status: Status.RESOLVED,
  //         }))
  //       )
  //       .catch(error => this.setState({ error, status: Status.REJECTED }));
  //   }
  // }
  // useEffect(() => {
  //   if (!search) return;
  //   setStatus('pending');
  //   apiImages
  //     .searchImages(search, page)
  //     .then(
  //       images => setImages(prevImg => [...prevImg, ...images]),
  //       setStatus('resolved')
  //     )
  //     .catch(
  //       error => error
  //       // , setStatus('rejected')
  //     );
  // }, [page, search]);

  const toggleModal = (largeImage, user) => {
    setShowModal(!showModal);
    setLargeImageId(largeImage);
    setLargeImageIdUser(user);
  };

  // const largeImageId = imageLargeId => {
  //   this.setState({ imageLargeId });
  // };
  // loadMore = () => {
  //   const { page } = this.state;
  //   const newPage = page + 1;

  //   this.setState({ page: newPage });
  //   console.log('123');
  // };

  // const { images, status, showModal, largeImageId, largeImageIdUser } =
  //   this.state;
  // const { search } = this.props;

  if (status === Status.IDLE) {
    return <div className={css.att}>Введіть дані для пошуку!</div>;
  }
  if (status === Status.PENDING) {
    return <Loader />;
  }

  if (status === Status.REJECTED || images < 1) {
    return (
      <div className={css.att}>
        Відсутнє зображення з назвою {searchN} {error}='(
      </div>
    );
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        {showModal && (
          <Modal
            toggleModal={toggleModal}
            src={largeImageId}
            alt={largeImageIdUser}
          />
        )}
        <ul className={css.ImageGallery}>
          {images.map(image => (
            <ImageGalleryItem
              toggleModal={toggleModal}
              largeImageId={largeImageId}
              key={image.id}
              image={image}
            />
          ))}
        </ul>
        {images.length > 0 && <Button loadMore={loadMore} />}
      </>
    );
  }
}

export default ImageGallery;
ImageGallery.propTypes = {
  searchN: PropTypes.string.isRequired,
  loadMore: PropTypes.func.isRequired,
  pageN: PropTypes.number.isRequired,
};
