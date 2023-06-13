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
  const [category, setCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState("");
  const [timer, setTimer] = useState(null);

  //Buscar el array de gender y category de allProducts
  const allProducts = useSelector((state) => state.allProducts);
  const arrayCategory = allProducts
    .map((object) => object.category)
    .filter((category, index, array) => array.indexOf(category) === index);
  const arrayGender = allProducts
    .map((object) => object.platform)
    .filter((gender, index, array) => array.indexOf(gender) === index);

  //checkbox
  const [isChecked, setIsChecked] = useState({});
  const [isCheckedGender, setIsCheckedGender] = useState({});

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const updatedState = {
      ...isChecked,
      [name]: checked,
    };
    setIsChecked(updatedState);
  
    dispatch(filterProductsByCategory(updatedState));

    const selectedCategoriesArray = Object.keys(updatedState).filter(
      (category) => updatedState[category]
    );
    const selectedCategoriesString = selectedCategoriesArray.join("-");
    setSelectedCategories(selectedCategoriesString);
  };

  const handleCheckboxChangeGender = (event) => {
    const { name, checked } = event.target;
    const updatedStateGender = {
      ...isCheckedGender,
      [name]: checked,
    };
    setIsCheckedGender(updatedStateGender);

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

    setIsChecked((prevState) => {
      const updatedState = { ...prevState };
      delete updatedState[name];
      return updatedState;
    });

    const updatedState = {...isChecked};

    const selectedCategoriesArray = Object.keys(updatedState).filter(
      (category) => updatedState[category]
    );
    const selectedCategoriesString = selectedCategoriesArray.join("-");
    setSelectedCategories(selectedCategoriesString);

    dispatch(getProducts());
  };
  return (
    <div className="Container">
      <div>
        FILTROS ACTIVOS:
        {selectedCategories &&
          selectedCategories.split("-").map((category) => (
            <div key={category}>
              <p>{category}</p>
              <button onClick={handleCloseType} name={category}>
                X
              </button>
            </div>
          ))}
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
          <span>FILTRO DE PLATAFORMA</span>
        </div>

        {arrayGender.map((gender) => (
          <div className="checkbox" key={gender}>
            <input
              type="checkbox"
              id={gender}
              name={gender}
              checked={isCheckedGender[gender] || false}
              onChange={handleCheckboxChangeGender}
            />
            <label htmlFor={gender}>{gender}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
