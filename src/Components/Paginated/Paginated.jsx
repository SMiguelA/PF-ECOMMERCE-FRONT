import style from "./Paginated.module.css";

const Paginated = ({
  productsPerPage,
  allProducts,
  paginated,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(allProducts / productsPerPage) - 1; i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <ul className={style.pagination}>
      {currentPage > 1 && (
        <li>
          <a
            onClick={() => paginated(currentPage - 1)}
            className={style.default_link}
          >
            {"<"}
          </a>
        </li>
      )}

      {pageNumbers.map((number) => (
        <li key={number}>
          {number === currentPage ? (
            <a onClick={() => paginated(number)} className={style.current_link}>
              {number}
            </a>
          ) : (
            <a onClick={() => paginated(number)} className={style.default_link}>
              {number}
            </a>
          )}
        </li>
      ))}

      {currentPage < pageNumbers.length && (
        <li>
          <a
            onClick={() => paginated(currentPage + 1)}
            className={style.default_link}
          >
            {">"}
          </a>
        </li>
      )}
    </ul>
  );
};

export default Paginated;
