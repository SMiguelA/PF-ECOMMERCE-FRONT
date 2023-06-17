import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { getProducts } from "../../../../Redux/Actions";
import style from './PriceFilter.module.css';

const PriceFilter = ({ setFilterData, filterData }) => {
  const dispatch = useDispatch();
  const defaultMin = 0;
  const defaultMax = 99999;

  // const product = useSelector((state) => state.products);

  const [minPrice2, setMinPrice2] = useState(defaultMin);
  const [maxPrice2, setMaxPrice2] = useState(defaultMax);
  const [timer, setTimer] = useState(null);

  const handleMinPriceChange = (event) => {
    setMinPrice2(event.target.value);

    timer && clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        const minPrice = event.target.value;
        const maxPrice = maxPrice2;

        setFilterData({
          ...filterData,
          filterPrice: `${minPrice || defaultMin}-${maxPrice || defaultMax}`
        })
      }, 600)
    );
    if (!event.target.value) {
      dispatch(getProducts());
    }
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice2(event.target.value);

    timer && clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        const maxPrice = Number(event.target.value);
        const minPrice = minPrice2;

        setFilterData({
          ...filterData,
          filterPrice: `${minPrice || defaultMin}-${maxPrice || defaultMax}`
        })
      }, 600)
    );
  };

  return (
    <div className={style.container}>
      <span>FILTRO DE PRECIO</span>
      <input
        type="number"
        value={!minPrice2 ? "" : minPrice2}
        onChange={handleMinPriceChange}
        placeholder="Min Price..."
      />
      <input
        type="number"
        value={maxPrice2 == 99999 ? "" : maxPrice2 }
        onChange={handleMaxPriceChange}
        placeholder="Max Price..."
      />
    </div>
  );
};

export default PriceFilter;
