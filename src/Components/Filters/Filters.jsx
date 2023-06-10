import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  filterProductsByCategory,
  getProductByName,
  getProducts,
} from "../../Redux/Actions";

import Autocomplete from "../../Components/AutoComplete/AutoComplete";
import PriceFilter from "../PriceFilter/PriceFilter";
import "./Filters.css";

export default function Filters() {
  const dispatch = useDispatch();

  const [product, setProduct] = useState("");
  const allProducts = useSelector((state) => state.allProducts);

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
  return (
    <div className="Container">
      <div>
        FILTROS ACTIVOS:
        {isChecked.videoGames && (
          <div>
            <p>Video Games</p>
          </div>
        )}
        {isChecked.componentsPC && (
          <div>
            <p>Components PC</p>
          </div>
        )}
        {product.length > 0 && (
          <div>
            <p>Texto: {product}</p>
            <button onClick={handleClose}>Cerrar</button>
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

      <div className="filter">
        <span>Nombre o categoria (ESTE NO FUNCIONA)</span>

        <Autocomplete />
      </div>
    </div>
  );
}
