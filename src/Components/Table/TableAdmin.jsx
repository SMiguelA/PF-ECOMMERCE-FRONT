import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Table, { Direction } from "react-data-table-component";
import "./TableAdmin.css";

const TableAdmin = () => {
  const [data, setData] = useState([]);
  const products = useSelector((state) => state.allProducts);

  const columns = [
    {
      name: "Image",
      cell: (row) => <img className="img" src={row.pictures[0]} />,
    },
    { name: "Product ID", selector: (row) => row.id, sortable: true },
    { name: "Product Name", selector: (row) => row.name, sortable: true },
    { name: "Product Price	", selector: (row) => row.price, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button>{row.id}</button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (!products.length) {
      setData([0]);
    } else {
      setData(products);
    }
  }, [products]);

  const typeStatus = [
    {
      id: "banned",
      name: "banned",
    },
    {
      id: "active",
      name: "active",
    },
    {
      id: "innactive",
      name: "innactive",
    },
  ];

  return (
    <>
      {data.length ? (
        <Table
          columns={columns}
          data={data}
          direction={Direction.AUTO}
          highlightOnHover={true}
          pointerOnHover={true}
          pagination={true}
          paginationPerPage={5}
        />
      ) : (
        <h1>Loading ...</h1>
      )}
    </>
  );
};

export default TableAdmin;
