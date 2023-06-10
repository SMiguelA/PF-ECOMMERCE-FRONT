import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { filterProductsByPrice } from "../../Redux/Actions";

const PriceFilter = () => {
  const dispatch = useDispatch();

  const product = useSelector((state) => state.products);

  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("99999");

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(filterProductsByPrice({ minPrice, maxPrice }));

    // Realiza el filtrado de datos utilizando minPrice y maxPrice
    // Puedes almacenar los resultados del filtrado en otro estado o pasarlos a otro componente para su visualización.
  };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ marginRight: "10px" }}>
          Precio mínimo: {minPrice}
          <input
            type="range"
            min="0"
            max="9999"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
        </label>
        <label>
          Precio máximo: {maxPrice}
          <input
            type="range"
            min="0"
            max="9999"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </label>
      </div>
      <button onClick={handleFilter}>Filtrar</button>
    </div>
  );
};

export default PriceFilter;
