import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "../../axios";
import { Loading } from "../../Components";
import styles from "./Orders.module.css";

export default function Orders() {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/users/${user._id}/orders`)
      .then(({ data }) => {
        console.log(data);
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <h1 className="text-center pt-3">No orders yet</h1>;
  }

  return (
    <div className={styles.container}>
      <h1>Your orders</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>
                <span>{order.status}</span>
              </td>
              <td>{order.date}</td>
              <td>${order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
