import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { createOrder } from "../../Redux/Actions";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [paying, setPaying] = useState(false);
  const dispatch = useDispatch();

  async function handlePay(e) {
    e.preventDefault();
    if (!stripe || !elements || user.cart.count <= 0) return;
    setPaying(true);
    const { client_secret } = await fetch(
      "http://localhost:3001/create-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Stripe-Version": "2020-08-27", // Versión de la API de Stripe
        },
        body: JSON.stringify({ amount: parseInt(user.cart.total) }),
      }
    ).then((res) => res.json());

    const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    setPaying(false);

    if (paymentIntent) {
      try {
        await dispatch(
          createOrder({ userId: user._id, cart: user.cart, address, country })
        );
        setAlertMessage(`Payment ${paymentIntent.status}`);

        setTimeout(() => {
          navigate("/orders");
        }, 3000);
      } catch (error) {
        console.error("Error creating order:", error);
      }
    }
  }

  return (
    <div className="cart-payment-container">
      <form onSubmit={handlePay}>
        <div>
          {alertMessage && <div>{alertMessage}</div>}
          <div>
            <label>First Name</label>
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              value={user.name}
              disabled
            />
          </div>
          <div>
            <label>Email</label>
            <input
              id="email"
              type="text"
              placeholder="Email"
              value={user.email}
              disabled
            />
          </div>
        </div>
        <div>
          <div>
            <label>Address</label>
            <input
              id="address"
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Country</label>
            <input
              id="country"
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
        </div>
        <label>Card</label>
        <label>Month</label>
        <CardElement id="card-element" />
        <button type="submit" disabled={user.cart.count <= 0 || paying}>
          {paying ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
