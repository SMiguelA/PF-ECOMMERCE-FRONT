import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutForm from "../../Components/CheckoutForm/CheckoutForm";
import {
  decreaseCart,
  increaseCart,
  removeFromCart,
} from "../../Redux/Actions";
import "./Cart.css";

const stripePromise = loadStripe(
  "pk_test_51N8O0ND2954uHErKoG1T2lk4aJZ8dAKHXYg9ojVmzMcy3j63g2RpmgnBzHm0CRey97o5ZCwm52F931uvtIzL9Bk400pvawEOTQ"
);

function Cart() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;

  const [cart, setCart] = useState(null);
  useEffect(() => {
    let cartt = Object.keys(userCartObj)
      .map((productId) => {
        const product = products.find((product) => {
          let bandera = product.id === productId || product._id === productId;

          return bandera;
        });

        if (product) {
          return product;
        }
      })
      .filter(Boolean);
    setCart(cartt);
    return () => {
      setCart(null);
    };
  }, [userCartObj]);

  //obtiene las claves, mapea y filtra los productos equivalentes

  function handleDecrease(product) {
    const { productId } = product;
    const quantity = user.cart[productId];
    if (quantity <= 0) return alert("Can't proceed");
    dispatch(decreaseCart(product));
  }

  function handleIncrease(product) {
    dispatch(increaseCart(product));
  }

  function handleRemoveFromCart(product) {
    dispatch(removeFromCart(product));
  }

  return (
    <div style={{ minHeight: "95vh" }} className="cart-container">
      <h1>Shopping cart</h1>

      {console.log(cart, "cart antes del div")}
      {cart?.length ? (
        <div>
          <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
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
                    <tr key={item._id || item.id}>
                      <td>&nbsp;</td>
                      <td>
                        <button
                          style={{ marginRight: 10, cursor: "pointer" }}
                          onClick={() =>
                            handleRemoveFromCart({
                              productId: item._id || item.id,
                              price: item.price,
                              userId: user._id || user.id,
                            })
                          }
                        >
                          X
                        </button>
                        <img
                          src={item.pictures[0]}
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
                          <button
                            onClick={() => {
                              handleDecrease({
                                productId: item._id || item.id,
                                price: item.price,
                                userId: user._id || user.id,
                              });
                            }}
                          >
                            -
                          </button>
                          <span>{user.cart[item._id || item.id]}</span>
                          <button
                            onClick={() => {
                              handleIncrease({
                                productId: item._id || item.id,
                                price: item.price,
                                userId: user._id || user.id,
                              });
                            }}
                          >
                            +
                          </button>
                        </span>
                      </td>
                      <td>${item.price * user.cart[item._id || item.id]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <h3>
                  Total: ${user.cart.total ? user.cart.total.toFixed(2) : 0}
                </h3>
              </div>
            </>
          </div>
        </div>
      ) : (
        <div>
          <div>Shopping cart is empty. Add products to your cart</div>
        </div>
      )}
    </div>
  );
}

export default Cart;
