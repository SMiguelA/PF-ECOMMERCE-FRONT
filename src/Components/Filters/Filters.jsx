import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  filterProductsByCategory,
  getProductByName,
} from "../../Redux/Actions";

import Autocomplete from "../../Components/AutoComplete/AutoComplete";
import PriceFilter from "../PriceFilter/PriceFilter";
import "./Filters.css";

export default function Filters() {
  const dispatch = useDispatch();

  const [product, setProduct] = useState("");

  const [inputValue, setInputValue] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    category: "",
    pictures: ["", "", ""],
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getProductByName(product));
  };
  const NameHandleInputChange = (e) => {
    e.preventDefault();
    setProduct(e.target.value);
  };

  const handleFilterProductsByCategory = (e) => {
    dispatch(filterProductsByCategory(e.target.value));
  };
  return (
    <div className="Container">
      <div className="filter">
        <span>Nombre del producto</span>
        <input
          type="text"
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
