import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  filterProducts,
} from "../../Redux/Actions";

import "./Filters.css";
import PriceFilter from "./components/PriceFilter/PriceFilter";
import { FilterCategory } from "./components/filterCategory/FilterCategory";
import { FilterName } from "./components/filterName/FilterName";
import { FilterPlatform } from "./components/filterPlatform/FilterPlatform";

export default function Filters() {
  const dispatch = useDispatch();

  const [filterData, setFilterData] = useState({
    filterCategory:"",
    filterPlatform:"",
    filterPrice:"",
    name:""
  });

  useEffect(() => {
    dispatch(filterProducts(filterData))
  },[filterData])

  return (
    <div className="Container">
      <div>
        <span>FILTRO POR NAME</span>
        <FilterName setFilterData={setFilterData} filterData={filterData}/>
      </div>

      <div className="filter">
        <span>FILTRO DE PRECIO</span>
        <PriceFilter setFilterData={setFilterData} filterData={filterData}/>
      </div>

      <div className="filterType">
        <span>FILTRO DE CATEGORIA</span>
        <FilterCategory setFilterData={setFilterData} filterData={filterData}/>
      </div>

      <div className="filterType">
        <span>FILTRO DE PLATAFORMA</span>
        <FilterPlatform setFilterData={setFilterData} filterData={filterData}/>
      </div>
    </div>
  );
}