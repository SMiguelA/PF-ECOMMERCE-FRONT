import { useSelector } from 'react-redux';
import { Paginated } from "../../../Components";
import Card from './Card';
import style from './Cards.module.css';

const Cards = ({productsss, productsPerPage, paginated}) => {

    const { products } = useSelector(state => state);

    return(
        <div className={style.container}>
            {
                products.map((product) => {
                    return <Card data={product} />
                })
            }
            <div className={style.paginated}>
              <Paginated
                productsPerPage={productsPerPage}
                allProducts={productsss.length}
                paginated={paginated}
              />
            </div>
        </div>
    );
};

export default Cards;
