import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./ActiveFilters.module.css";

export const ActiveFilters = () => {
  const dispatch = useDispatch();
  const activeFilters = useSelector((state) => state.filters);

  return (
    <div className={style.container}>
      {activeFilters && activeFilters.name && (
        <div className={style.filtersItem}>
          <div className={style.data}>
            <div className={style.labelName}>Name:</div>
            <div className={style.labelFilter}>{activeFilters.name}</div>
          </div>
          {/* <button className={style.closeFilter}>x</button> */}
        </div>
      )}
      {activeFilters && activeFilters.price && activeFilters.price != "0" && (
        <div className={style.filtersItem}>
          <div className={style.data}>
            <div className={style.labelName}>Price:</div>
            <div className={style.labelFilter}>{activeFilters.price}</div>
          </div>
          {/* <button className={style.closeFilter}>x</button> */}
        </div>
      )}
      {activeFilters &&
        activeFilters.category[0] &&
        activeFilters.category.map((category) => {
          return (
            <div className={style.filtersItem} key={category}>
              <div className={style.data}>
                <div className={style.labelName}>Category:</div>
                <div className={style.labelFilter}>{category}</div>
              </div>
              {/* <button className={style.closeFilter}>x</button> */}
            </div>
          );
        })}
      {activeFilters &&
        activeFilters.platform[0] &&
        activeFilters.platform.map((platform) => {
          return (
            <div className={style.filtersItem} key={platform}>
              <div className={style.data}>
                <div className={style.labelName}>Platform:</div>
                <div className={style.labelFilter}>{platform}</div>
              </div>
              {/* <button className={style.closeFilter}>x</button> */}
            </div>
          );
        })}
    </div>
  );
};
