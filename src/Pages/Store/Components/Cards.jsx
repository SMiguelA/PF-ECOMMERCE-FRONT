// import { Paginated } from "../../../Components";
import Card from "./Card";
import style from "./Cards.module.css";

const Cards = (props) => {
  const { products } = props;
  return (
    <div className={style.container}>
      {products.map((product) => {
        return <Card data={product} />;
      })}
      {/* <div className={style.paginated}>
              <Paginated
                productsPerPage={productsPerPage}
                allProducts={productsss.length}
                paginated={paginated}
              />
            </div> */}
    </div>
  );
};

export default Cards;
