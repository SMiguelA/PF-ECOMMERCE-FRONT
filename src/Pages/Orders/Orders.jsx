import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "../../axios";
import OrderCard from "./components/OrderCard";
import { OrdersContainer } from "./Orders.style";

export default function Orders() {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);


  useEffect(() => {

    axios
      .get(`/users/${user._id}/orders`)
      .then(({ data }) => {

        console.log(data);
        setOrders(data);
      })
  }, []);

  return (
    <OrdersContainer>
      <h1>ESPACIO</h1>

      {orders ? (
        orders.map((order) => (

          <OrderCard order={order}  key={order._id} />
          
        ))
      ) : (
        <h1>NO HAY ORDENES</h1>
      )}
    </OrdersContainer>
  );
}
