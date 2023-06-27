import React from "react";
import {
  DetailLabel,
  DetailLabelValue,
  OrderCardContainer,
  OrderDetails,
  OrderDetailsContainer,
  StatusCircle,
} from "./AdminOrderCard.style";

export default function AdminOrderCard({ order }) {
  return (
    <OrderCardContainer>
      {/* Status Circle */}
      <StatusCircle status={order.status} />

      <OrderDetailsContainer>
        <DetailLabelValue style={{ color: "white" , fontSize: "1.2rem" }}>
        {order.owner.name}</DetailLabelValue>
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
          <DetailLabel>
            Email: <DetailLabelValue>{order.owner.email}</DetailLabelValue>
          </DetailLabel>
        </OrderDetails>
      </OrderDetailsContainer>
    </OrderCardContainer>
  );
}
