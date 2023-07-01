import { useEffect } from "react";

import Table, { Direction } from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../Redux/Actions";
import "./TableAdmin.css";

const TableOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const userAdmin = useSelector((state) => state.user.isAdmin);

  useEffect(() => {
    dispatch(getOrders(userAdmin));
  }, []);

  const columns = [
    { name: "Order ID", selector: (row) => row._id, sortable: false },

    { name: "Status", selector: (row) => row.status, sortable: true },
    { name: "Client", selector: (row) => row.owner.name, sortable: true },
    { name: "Email", selector: (row) => row.owner.email, sortable: true },
    { name: "Total Amount", selector: (row) => row.total, sortable: true },
    { name: "Date", selector: (row) => row.date, sortable: true },
  ];

  return (
    <>
      <h1></h1>
      <h1></h1>
      <h1></h1>

      {orders && orders.length ? (
        <Table
          columns={columns}
          data={orders}
          direction={Direction.AUTO}
          highlightOnHover={true}
          pointerOnHover={true}
          theme="dark"
          pagination={true}
          paginationPerPage={10}
        />
      ) : (
        <h1>Loading ...</h1>
      )}
    </>
  );
};

export default TableOrders;
