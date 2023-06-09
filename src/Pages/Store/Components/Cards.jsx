import Card from "./Card";
import style from "./Cards.module.css";

const Cards = ({ products }) => {
  return (
    <div className={style.container}>
      {products.map((product) => {
        return <Card data={product} />;
      })}
    </div>
  );
};

export default Cards;
