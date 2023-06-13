import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useSelector } from "react-redux";
import CheckoutForm from "../../Components/CheckoutForm/CheckoutForm";
import "./Cart.css";

const stripePromise = loadStripe(
  "pk_test_51N8O0ND2954uHErKoG1T2lk4aJZ8dAKHXYg9ojVmzMcy3j63g2RpmgnBzHm0CRey97o5ZCwm52F931uvtIzL9Bk400pvawEOTQ"
);

function Cart() {
  const user = useSelector((state) => state.cart);
  const products = useSelector((state) => state.allProducts);
  const userCartObj = user.cart;
  let cart = products.filter((product) => {
    console.log(userCartObj[product.id]);
    return userCartObj[product.id] != null;
  });

  function handleDecrease(product) {
    // const quantity = user.cart.count;
    // if (quantity <= 0) return alert("Can't proceed");
    // decreaseCart(product);
  }

  return (
    <div style={{ minHeight: "95vh" }} className="cart-container">
      <h1>Shopping cart</h1>
      <div className="content">
        {cart.length === 0 ? (
          <div>Shopping cart is empty. Add products to your cart</div>
        ) : (
          <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        )}
      </div>
      {cart.length > 0 && (
        <div>
          <div>
            <>
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {/* loop through cart products */}
                  {cart.map((item) => (
                    <tr key={item._id}>
                      <td>&nbsp;</td>
                      <td>
                        <i style={{ marginRight: 10, cursor: "pointer" }}></i>
                        <img
                          src={item.pictures[0].url}
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <span>
                          <i></i>
                          <span>{user.cart[item._id]}</span>
                          <i></i>
                        </span>
                      </td>
                      <td>${item.price * user.cart[item._id]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <h3>Total: ${user.cart.total}</h3>
              </div>
            </>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
