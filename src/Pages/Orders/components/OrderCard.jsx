import React from "react";
import {
  DetailLabel,
  DetailLabelValue,
  OrderCardContainer,
  OrderDetails,
  OrderDetailsContainer,
  StatusCircle,
} from "./OrderCard.style";

export default function OrderCard({ order }) {
  return (
    <OrderCardContainer>
      {/* Status Circle */}
      <StatusCircle status={order.status} />

      <OrderDetailsContainer>
        <DetailLabelValue style={{ color: "white" , fontSize: "1.2rem" }}>
        {order._id}</DetailLabelValue>
        <hr />
        <OrderDetails>
          <DetailLabel>
            Status: <DetailLabelValue> {order.status}</DetailLabelValue>
          </DetailLabel>
          <DetailLabel>
            Total Amount: <DetailLabelValue>{order.total}</DetailLabelValue>
          </DetailLabel>
          <DetailLabel>
            Date: <DetailLabelValue>{order.date}</DetailLabelValue>
          </DetailLabel>
          <DetailLabel>
            Country: <DetailLabelValue>{order.country}</DetailLabelValue>
          </DetailLabel>
        </OrderDetails>
      </OrderDetailsContainer>
    </OrderCardContainer>
  );
}
