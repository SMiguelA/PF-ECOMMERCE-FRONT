import { useState } from "react";
import { useSelector } from "react-redux";

import { Outlet, useLocation } from "react-router";
import Filters from "../../Components/Filters/Filters";
import Cards from "./Components/Cards";

export default function Store() {
  const location = useLocation();

  //Para el paginado
  const allProducts = useSelector((state) => state.allProducts);
  const productsFiltered = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
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
        <div className="divContainer">
          <div className="divFilter">
            <Filters />
          </div>
          <div className="divProducts">
            {currentProducts &&
              currentProducts.length > 0 &&
              currentProducts.map((el) => {
                return <Cards products={allProducts} key={el.id} />;
              })}
          </div>

          {/* <div className={style.cards}>
            {currentProducts &&
              currentProducts.length > 0 &&
              currentProducts.map((el) => {
                return <Cards products={allProducts} key={el.id} />;
              })}
          </div> */}

          {/* <div className={style.paginated}>
            <Paginated
              productsPerPage={productsPerPage}
              allProducts={allProducts.length}
              paginated={paginated}
            />
          </div> */}
        </div>
      )}
      <Outlet />
    </>
  );
}
