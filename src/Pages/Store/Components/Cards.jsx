import data from '../data';
import Card from './Card';
import style from './Cards.module.css';

const Cards = () => {

    return(
        <div className={style.container}>
            {
                data.map((product) => {
                    return <Card data={product} />
                })
            }
        </div>
    );
};

export default Cards;