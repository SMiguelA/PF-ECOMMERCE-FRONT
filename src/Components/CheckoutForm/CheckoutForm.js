import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { createOrder } from "../../Redux/Actions";

import './CheckoutForm.css';

function CheckoutForm({data}) {
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
      "https://pf-ecommerce-back-production.up.railway.app/create-payment",
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

    console.log(paymentIntent, "paymentIntent");

    setPaying(false);

    if (paymentIntent) {
      try {
        const paymentStatus = paymentIntent.status;

        await dispatch(
          createOrder({
            userId: user._id,
            cart: user.cart,
            address,
            country,
            paymentStatus,
          })
        );

        console.log(paymentIntent.status);
        setAlertMessage(`Payment ${paymentIntent.status}`);
        window.alert(`Payment ${paymentIntent.status}`);
        setTimeout(() => {
          navigate("/orders");
        }, 3000);
      } catch (error) {
        console.error("Error creating order:", error);
      }
    } else {
      window.alert(
        "There was an error processing the payment, check your card details"
      );
    }
  }

  const pasarelaPagos = {
    style:{
      base: {
        marginTop: '1em',
        marginBottom: '1em',
        display: 'flex',
        color: 'white',
        flexDirection: 'column',
        '::placeholder': {
          color: '#aab7c4',
        },
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '10px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
      },
    }
  }

  return (
    <form onSubmit={handlePay} className="contenedorFormulario">
      {alertMessage && <div>{alertMessage}</div>}
      <div className="labelsInputs">
        <div className="nameContainer">
          <label>First Name</label>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            value={user.name}
            disabled
          />
        </div>
        <div className="nameContainer">
          <label>Email</label>
          <input
            id="email"
            type="text"
            placeholder="Email"
            value={user.email}
            disabled
          />
        </div>
        <div className="nameContainer">
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
        <div className="nameContainer">
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
      <div className="pasarelaContainer">
        <CardElement id="card-element" options={pasarelaPagos} />
      </div>
      <div className="totalCost">
        <h2>Total Cost:</h2>
        <h3>${data}</h3>
      </div>
      <button type="submit" disabled={user.cart.count <= 0 || paying}>
        {paying ? "Processing..." : "Pay"}
      </button>
    </form>
  );
}

export default CheckoutForm;
