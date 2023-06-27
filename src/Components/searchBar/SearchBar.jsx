import React, { useEffect, useState } from "react";
import { SiBattledotnet, SiEpicgames, SiOrigin, SiPlaystation, SiSteam, SiUbisoft, SiXbox } from 'react-icons/si';
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
  // console.log(filteredData);

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
                <Link to={`/store/detail/${product.id}`} className={styled.divDataProduct} key={product.id}>
                  <div className={styled.containerGame}>
                    <img src={product.pictures[0]} alt="picture" />
                    <div className={styled.info}>
                      <label>{product.name}</label>
                      <p>${product.price}</p>
                        {product.platform.toLowerCase() == 'steam' && <SiSteam />}
                        {product.platform.toLowerCase() == 'battle.net' && <SiBattledotnet />}
                        {product.platform.toLowerCase() == 'epic games' && <SiEpicgames />}
                        {product.platform.toLowerCase() == 'xbox live' && <SiXbox />}
                        {product.platform.toLowerCase() == 'playstation' && <SiPlaystation />}
                        {product.platform.toLowerCase() == 'origin' && <SiOrigin />}
                        {product.platform.toLowerCase() == 'ubisoft' && <SiUbisoft />}
                    </div>
                  </div>
                </Link>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
