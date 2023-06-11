import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  filterProductsByCategory,
  filterProductsByType,
  getProductByName,
  getProducts,
} from "../../Redux/Actions";

import PriceFilter from "../PriceFilter/PriceFilter";
import "./Filters.css";

export default function Filters() {
  const dispatch = useDispatch();

  const [product, setProduct] = useState("");

  //checkbox
  const [isChecked, setIsChecked] = useState({
    videoGames: false,
    componentsPC: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setIsChecked({
      ...isChecked,
      [name]: checked,
    });

    if (name === "videoGames") {
      dispatch(filterProductsByType({ type: "videoGames", checked }));
    } else if (name === "componentsPC") {
      dispatch(filterProductsByType({ type: "componentsPC", checked }));
    }
  };
  //termina checkbox

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getProductByName(product));
  };
  const NameHandleInputChange = (e) => {
    setProduct(e.target.value);
    dispatch(getProductByName(product));
    if (e.target.value == "") {
      dispatch(getProducts());
    }
  };

  const handleFilterProductsByCategory = (e) => {
    dispatch(filterProductsByCategory(e.target.value));
  };

  const handleClose = (e) => {
    setProduct("");
    dispatch(getProducts());
  };

  const handleCloseType = (e) => {
    const { name } = e.target;
    setIsChecked((prevState) => ({
      ...prevState,
      [name]: false,
    }));
    dispatch(getProducts());
  };
  return (
    <div className="Container">
      <div>
        FILTROS ACTIVOS:
        {isChecked.videoGames && (
          <div>
            <p>Video Games</p>
            <button onClick={handleCloseType} name="videoGames">
              X
            </button>
          </div>
        )}
        {isChecked.componentsPC && (
          <div>
            <p>Components PC</p>
            <button onClick={handleCloseType} name="componentsPC">
              X
            </button>
          </div>
        )}
        {product.length > 0 && (
          <div>
            <p>Texto: {product}</p>
            <button onClick={handleClose}>X</button>
          </div>
        )}
      </div>

      <div className="filter">
        <span>Nombre del producto</span>
        <input
          type="text"
          value={product}
          onChange={NameHandleInputChange}
          placeholder="Buscar por nombre de producto..."
        />
        <button onClick={handleSubmit} type="submit">
          Buscar
        </button>
      </div>

      <div className="filter">
        <span>FILTRO DE PRECIO</span>
        <PriceFilter />
      </div>

      <div className="filterType">
        <div>
          <span>FILTRO DE TIPO</span>
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            name="videoGames"
            checked={isChecked.videoGames}
            onChange={handleCheckboxChange}
          />
          <label>Videojuego</label>
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            name="componentsPC"
            checked={isChecked.componentsPC}
            onChange={handleCheckboxChange}
          />
          <label>Componentes de computadora</label>
        </div>
      </div>

      <div>
        <span>Filtro por Categoria</span>

        <div className="filter">
          <select onChange={handleFilterProductsByCategory}>
            <option value="All">Todos</option>
            <option value="Mouse">Mouse</option>
            <option value="Teclado">Teclado</option>
          </select>
        </div>
      </div>
    </div>
  );
}
