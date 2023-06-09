import { useState } from "react";
import { useSelector } from "react-redux";
import { Paginated } from "../../Components";
import { Outlet, useLocation } from "react-router";
import Filters from "../../Components/Filters/Filters";
import Cards from "./Components/Cards";
import style from "./Store.module.css";
import { DivContainer } from "../../ComponentsStyles";
export default function Store() {
  const location = useLocation();

  //Para el paginado
  const allProducts = useSelector((state) => state.allProducts);
  const productsFiltered = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirsProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(
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
                allProducts={allProducts.length}
                paginated={paginated}
              />
            </div>
            <div className="divProducts">
              {currentProducts && currentProducts.length > 0 && (
                <Cards products={allProducts} />
              )}
            </div>
          </div>
        </DivContainer>
      )}
      <Outlet />
    </>
  );
}
