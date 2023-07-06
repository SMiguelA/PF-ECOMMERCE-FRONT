import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import style from "./OrderCard.module.css";
import {
  DetailLabel,
  DetailLabelValue,
  OrderCardContainer,
  OrderDetails,
  OrderDetailsContainer,
  StatusCircle,
} from "./OrderCard.style";

export default function OrderCard({ order }) {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    let products = Object.keys(order.products);
    let promises = products.map((product) => {
      if (product != "total" && product != "count") {
        return axios.get(`/products/${product}`);
      } else {
        return null;
      }
    });
    promises = promises.filter((promise) => promise !== null);

    // products = Promise.all(promises).then((products) => console.log(products));
    Promise.all(promises)
      .then((responses) => {
        const productsData = responses.map((response) => response.data);
        setProductsList(productsData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <OrderCardContainer>
      {/* Status Circle */}
      <StatusCircle status={order.status} />

      <OrderDetailsContainer>
        <DetailLabelValue style={{ color: "white", fontSize: "1.2rem" }}>
          Order Summary:
        </DetailLabelValue>
        <hr />
        <OrderDetails>
          <DetailLabel>
            Status: <DetailLabelValue> {order.status}</DetailLabelValue>
          </DetailLabel>

          <DetailLabel>
            Total Amount:{" "}
            <DetailLabelValue>{order.total.toFixed(2)}</DetailLabelValue>
          </DetailLabel>
          <DetailLabel>
            Date: <DetailLabelValue>{order.date}</DetailLabelValue>
          </DetailLabel>
          <DetailLabel>
            Country: <DetailLabelValue>{order.country}</DetailLabelValue>
          </DetailLabel>
        </OrderDetails>

        <div className={style.containerDiv}>
          Products:
          {productsList?.map((product) => {
            return (
              <div className={style.divIntern}>
                <p className={style.label}>
                  <label>Game:</label> {product.name}
                </p>

                <p className={style.label}>
                  <label>Quantity:</label>{" "}
                  {order.products[product._id || product.id]}
                </p>
              </div>
            );
          })}
        </div>
      </OrderDetailsContainer>
    </OrderCardContainer>
  );
}
