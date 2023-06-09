import style from "./Paginated.module.css";

const Paginated = ({ productsPerPage, allProducts, paginated }) => {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(allProducts / productsPerPage) - 1; i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav>
      <ul className={style.pagination}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number}>
              <a href="#" onClick={() => paginated(number)}>
                {number}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Paginated;
