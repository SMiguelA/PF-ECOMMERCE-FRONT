import { Link } from 'react-router-dom';
import style from './Navigation.module.css';

export default function Home() {
  return (
    <div className={style.container}>
      <Link to="/" className={style.noLinea}>
        <h1>E-Commerce</h1>
      </Link>
    </div>
  );
}
