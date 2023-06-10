import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router";
import { Paginated } from "../../Components";
import Filters from "../../Components/Filters/Filters";
import { DivContainer } from "../../ComponentsStyles";
import Cards from "./Components/Cards";
import style from "./Store.module.css";
export default function Store() {
  const location = useLocation();

  //Para el paginado
  const allProducts = useSelector((state) => state.allProducts);
  const productsFiltered = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirsProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsFiltered.slice(
    indexOfFirsProduct,
    indexOfLastProduct
  );

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //fin del paginado
  return (
    <>
      {location.pathname === "/store" && (
        <DivContainer>
          <Filters />

          <div className={style.containerStoreContent}>
            <div className={style.paginated}>
              <Paginated
                productsPerPage={productsPerPage}
                allProducts={productsFiltered.length}
                paginated={paginated}
              />
            </div>
            <div className="divProducts">
              {currentProducts && currentProducts.length > 0 && (
                <Cards currentProducts={currentProducts} />
              )}
            </div>
          </div>
        </DivContainer>
      )}
      <Outlet />
    </>
  );
}
