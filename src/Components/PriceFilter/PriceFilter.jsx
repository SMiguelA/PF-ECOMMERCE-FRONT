import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { filterProductsByPrice, getProducts } from "../../Redux/Actions";

const PriceFilter = () => {
  const dispatch = useDispatch();

  // const product = useSelector((state) => state.products);

  const [minPrice2, setMinPrice2] = useState(0);
  const [maxPrice2, setMaxPrice2] = useState(99999);
  const [timer, setTimer] = useState(null);

  const handleMinPriceChange = (event) => {
    setMinPrice2(event.target.value);

    timer && clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        if (!event.target.value) {
          console.log("NO HAY NADA");
        } else {
          const minPrice = event.target.value;

          const maxPrice = maxPrice2;
          dispatch(filterProductsByPrice({ minPrice, maxPrice }));
        }
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
        if (!event.target.value) {
          console.log("NO HAY NADA");
        } else {
          const maxPrice = Number(event.target.value);
          console.log(minPrice2, maxPrice);
          const minPrice = minPrice2;

          dispatch(filterProductsByPrice({ minPrice, maxPrice }));
        }
      }, 600)
    );

    if (!event.target.value) {
      dispatch(getProducts());
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    // dispatch(filterProductsByPrice({ minPrice, maxPrice }));

    // Realiza el filtrado de datos utilizando minPrice y maxPrice
    // Puedes almacenar los resultados del filtrado en otro estado o pasarlos a otro componente para su visualización.
  };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ marginRight: "10px" }}>
          Precio mínimo: {minPrice2}
          <input
            type="number"
            value={minPrice2}
            onChange={handleMinPriceChange}
          />
        </label>
        <label>
          Precio máximo: {maxPrice2}
          <input
            type="number"
            value={maxPrice2}
            onChange={handleMaxPriceChange}
          />
        </label>
      </div>
      <button onClick={handleFilter}>Filtrar</button>
    </div>
  );
};

export default PriceFilter;
