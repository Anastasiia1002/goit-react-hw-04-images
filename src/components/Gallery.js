import { useState } from 'react';
import css from './Gallery.module.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

function Gallery() {
  // state = {
  //   search: '',
  //   page: 1,
  // };
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const onSubmit = search => {
    setSearch(search);
    setPage(1);
  };
  // if (this.state.page === 1) {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth',
  //   });
  // }

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className={css.Gallery}>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery searchN={search} loadMore={loadMore} pageN={page} />
    </div>
  );
}

export default Gallery;
