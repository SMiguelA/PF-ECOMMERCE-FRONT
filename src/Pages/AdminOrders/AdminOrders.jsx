import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getOrders } from "../../Redux/Actions";
import { OrdersContainer } from "./AdminOrders.style";
import AdminOrderCard from "./components/AdminOrderCard";

export default function AdminOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const userAdmin = useSelector((state) => state.user.isAdmin);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    console.log(orders);
    dispatch(getOrders(token, userAdmin));
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

  return (
    <OrdersContainer>
      <h1>Users purchase history</h1>

      {orders ? (
        orders.map((order) => <AdminOrderCard order={order} key={order._id} />)
      ) : (
        <h1>NO HAY ORDENES</h1>
      )}
    </OrdersContainer>
  );
}
