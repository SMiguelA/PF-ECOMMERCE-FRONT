import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  filterProductsByCategory,
  filterProductsByGender,
  getProductByName,
  getProducts,
} from "../../Redux/Actions";

import PriceFilter from "../PriceFilter/PriceFilter";
import "./Filters.css";

export default function Filters() {
  const dispatch = useDispatch();

  const [product, setProduct] = useState("");
  const [category, setCategory] = useState(false);
  const [timer, setTimer] = useState(null);

  //Buscar el array de gender y category de allProducts
  const allProducts = useSelector((state) => state.allProducts);
  const arrayCategory = allProducts
    .map((object) => object.category)
    .filter((category, index, array) => array.indexOf(category) === index);
  const arrayPlatform = allProducts
    .map((object) => object.platform)
    .filter((platform, index, array) => array.indexOf(platform) === index);

  //checkbox
  const [isChecked, setIsChecked] = useState({});
  const [isCheckedPlatform, setIsCheckedPlatform] = useState({});

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const updatedState = {
      ...isChecked,
      [name]: checked,
    };
    setIsChecked(updatedState);

    dispatch(filterProductsByCategory(updatedState));
  };

  const handleCheckboxChangePlatform = (event) => {
    const { name, checked } = event.target;
    const updatedStateGender = {
      ...isCheckedPlatform,
      [name]: checked,
    };
    setIsCheckedPlatform(updatedStateGender);

    dispatch(filterProductsByGender(updatedStateGender));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getProductByName(product));
  };
  const NameHandleInputChange = (e) => {
    setProduct(e.target.value);

    timer && clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        if (product == "") {
          console.log("NO HAY NADA");
        } else dispatch(getProductByName(product));
      }, 600)
    );

    if (e.target.value == "") {
      dispatch(getProducts());
    }
  };

  const handleFilterProductsByCategory = (e) => {
    const { value } = e.target;

    if (value === "All") {
      setCategory(false);
      dispatch(getProducts());

      return;
    }
    dispatch(filterProductsByCategory(e.target.value));
    setCategory(true);
  };

  const handleClose = (e) => {
    setProduct("");
    dispatch(getProducts());
  };

  const handleCloseCategory = (e) => {
    setCategory(false);
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
        {category && (
          <div>
            <p>Categoria</p>
            <button onClick={handleCloseCategory}>X</button>
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
          <span>FILTRO DE CATEGORIA</span>
        </div>

        {arrayCategory.map((category) => (
          <div className="checkbox" key={category}>
            <input
              type="checkbox"
              id={category}
              name={category}
              checked={isChecked[category] || false}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>

      <div className="filterType">
        <div>
          <span>FILTRO DE GENERO</span>
        </div>

        {arrayPlatform.map((platform) => (
          <div className="checkbox" key={platform}>
            <input
              type="checkbox"
              id={platform}
              name={platform}
              checked={isCheckedPlatform[platform] || false}
              onChange={handleCheckboxChangePlatform}
            />
            <label htmlFor={platform}>{platform}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
