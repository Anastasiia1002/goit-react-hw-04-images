import RingLoader from 'react-spinners/RingLoader';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div>
      <RingLoader className={css.loader} color="#7e3568" />
    </div>
  );
}
