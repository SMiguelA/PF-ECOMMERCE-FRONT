import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "./SearchBar.module.css";

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const productsData = useSelector((state) => state.allProducts);

  const handlerInput = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    setFilteredData(
      productsData?.filter((product) => {
        return product.name.toLowerCase().includes(inputValue.toLowerCase());
      })
    );
  }, [inputValue]);

  return (
    <div className={styled.container}>
      <input
        type="text"
        value={inputValue}
        onChange={handlerInput}
        className={styled.input}
        placeholder="Search By Name..."
      />
      <div className={styled.containerData}>
        {filteredData?.length && inputValue ? (
          filteredData.map((product) => {
            return (
              <div className={styled.divDataProduct}>
                <Link to={`/store/detail/${product.id}`}>
                  <label>{product.name}</label>
                </Link>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
