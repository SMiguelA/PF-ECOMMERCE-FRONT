import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  activeFilterCategory,
  activeFilterPlatform,
  activeFilterPrice,
  filterProducts
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
    setTimeout(() => {
      dispatch(activeFilterPrice(filterData.filterPrice))
      dispatch(activeFilterCategory(filterData.filterCategory))
      dispatch(activeFilterPlatform(filterData.filterPlatform))
    },150)
  },[filterData])

  return (
    <div className="Container">
      <FilterName setFilterData={setFilterData} filterData={filterData}/>
      <hr />
      <PriceFilter setFilterData={setFilterData} filterData={filterData}/>
      <hr />
      <FilterCategory setFilterData={setFilterData} filterData={filterData}/>
      <hr />
      <FilterPlatform setFilterData={setFilterData} filterData={filterData}/>
    </div>
  );
}