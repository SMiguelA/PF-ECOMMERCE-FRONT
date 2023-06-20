import { useEffect } from "react";

import Table, { Direction } from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../Redux/Actions";
import "./TableAdmin.css";

const TableOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const columns = [
    { name: "Order ID", selector: (row) => row._id, sortable: false },

    { name: "Status", selector: (row) => row.status, sortable: true },
    { name: "Client", selector: (row) => row.owner.name, sortable: true },
    { name: "Email", selector: (row) => row.owner.email, sortable: true },
    { name: "Total Amount", selector: (row) => row.total, sortable: true },
    { name: "Date", selector: (row) => row.date, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button>{row._id}</button>
        </div>
      ),
    },
  ];

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
      <h1>ESPACIO</h1>
      <h1>ESPACIO</h1>

      {orders && orders.length ? (
        <Table
          columns={columns}
          data={orders}
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

export default TableOrders;
