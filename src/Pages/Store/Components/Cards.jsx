import { useSelector } from 'react-redux';
import Card from './Card';
import style from './Cards.module.css';

const Cards = () => {

    const { products } = useSelector(state => state);

    return(
        <div className={style.container}>
            {
                products.map((product) => {
                    return <Card data={product} />
                })
            }
        </div>
    );
};

export default Cards;
