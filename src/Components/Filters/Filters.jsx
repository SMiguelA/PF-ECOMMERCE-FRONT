import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  filterProductsByCategory,
  getProductByName,
} from "../../Redux/Actions";

import Autocomplete from "../../Components/AutoComplete/AutoComplete";
import "./Filters.css";

export default function Filters() {
  const dispatch = useDispatch();

  const [product, setProduct] = useState("");

  const products = [
    {
      id: "64812c2eb288b6f583104a14",
      name: "Teclado",
      description:
        "Teclado gamer con luces y buen rendimiento, perfecto para jugar",
      price: 10,
      category: "Teclado",
      pictures: ["Foto1", "Foto2", "Foto3"],
    },
    {
      id: "64812c2eb288b6f583104a12",
      name: "Teclado 2",
      description:
        "Teclado gamer con luces y buen rendimiento, perfecto para jugar",
      price: 5,
      category: "Teclado",
      pictures: ["Foto1", "Foto2", "Foto3"],
    },
    {
      id: "648138c0de99f0c805cdba3c",
      name: "Mouse",
      description:
        "Mouse con buenos dps perfecto para ponerte serio cuando juegas con tus amigos",
      price: 15,
      category: "Mouse",
      pictures: ["Foto1", "Foto2", "Foto3"],
    },
  ];

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
      <span>Filtro por Categoria</span>

      <div className="filter">
        <select onChange={handleFilterProductsByCategory}>
          <option value="All">Todos</option>
          <option value="Mouse">Mouse</option>
          <option value="Teclado">Teclado</option>
        </select>
      </div>

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
        <span>Nombre o categoria</span>

        <Autocomplete />
      </div>
    </div>
  );
}
