import Card from "./Card";
import style from "./Cards.module.css";

const Cards = ({ currentProducts }) => {
  return (
    <div className={style.container}>
      {currentProducts.map((product) => {
        return <Card data={product} />;
      })}
    </div>
  );
};

export default Cards;
