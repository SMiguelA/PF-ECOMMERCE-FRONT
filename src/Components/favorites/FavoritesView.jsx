import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Paginated } from "..";
import { ActiveFilters } from "../../Pages/Store/Components/ActiveFilters";
import Cards from "../../Pages/Store/Components/Cards";
import styles from "./styles.module.css";
// import { useSelector } from "react-redux";

export const FavoritesView = () => {
  const productsFiltered = useSelector((state) => state.myFavorites);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirsProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsFiltered?.slice(
    indexOfFirsProduct,
    indexOfLastProduct
  );

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [productsFiltered]);

  return (
    <div className={styles.containerStoreContent}>
      <div className={styles.productsContainer}>
        <div className={styles.paginated}>
          <Paginated
            productsPerPage={productsPerPage}
            allProducts={productsFiltered?.length}
            paginated={paginated}
          />
        </div>
        <ActiveFilters />
        <div className={styles.containerCards}>
          {currentProducts && currentProducts?.length > 0 && (
            <Cards products={currentProducts} />
          )}
        </div>
      </div>

      {/* <Filters /> */}
    </div>
  );
};
