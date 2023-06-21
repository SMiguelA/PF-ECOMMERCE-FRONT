import React, { useEffect, useState } from "react";
import Table, { Direction } from "react-data-table-component";
import { useSelector } from "react-redux";

import axios from "../../axios";
import { Loading } from "../../Components";

export default function Orders() {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/users/${user._id}/orders`)
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <h1 className="text-center pt-3">No orders yet</h1>;
  }

  const columns = [
    { name: "Order ID", selector: (row) => row._id, sortable: false },

    { name: "Status", selector: (row) => row.status, sortable: true },
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

  return (
    // <div className={styles.container}>
    //   <h1>Your orders</h1>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>#</th>
    //         <th>Status</th>
    //         <th>Date</th>
    //         <th>Total</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {orders.map((order) => (
    //         <tr key={order._id}>
    //           <td>{order._id}</td>
    //           <td>
    //             <span>{order.status}</span>
    //           </td>
    //           <td>{order.date}</td>
    //           <td>${order.total}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>

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
}
