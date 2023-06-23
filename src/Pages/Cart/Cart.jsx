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
    else {
      dispatch(decreaseCart(product));
    }
  }

  function handleIncrease(product) {
    dispatch(increaseCart(product));
  }

  function handleRemoveFromCart(product) {
    dispatch(removeFromCart(product));
  }

  return (
    <div style={{ minHeight: "100%" }} className="contenedorCart">
      {cart?.length ? (
        <div className="infoContainer">
          <div className="stripeContainer">
            <h1>Order Summary</h1>
            <hr />
            <Elements stripe={stripePromise}>
              <CheckoutForm data={user.cart.total ? user.cart.total.toFixed(2) : 0}/>
            </Elements>
          </div>
          <div className="itemsContent">
            <h1>Shopping Cart</h1>
            <hr />
            <table className="cart-table">
              <thead>
                <tr>
                  {/* <th>&nbsp;</th> */}
                  <th>Product Detail</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {/* loop through cart products */}
                {cart.map((item) => (
                  <tr key={item._id || item.id} className="itemContainer">
                    {/* <td>&nbsp;</td> */}
                    <td className="productInformation">
                      <img
                        src={item.pictures[0]}
                        style={{
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <label className="">{item.name}</label>
                        <label className="">{item.platform}</label>
                        <label 
                          style={{ marginRight: 10, cursor: "pointer" }}
                          className="remove"
                          onClick={() =>
                            handleRemoveFromCart({
                              productId: item._id || item.id,
                              price: item.price,
                              userId: user._id || user.id,
                            })
                          }>Remove</label>
                      </div>
                    </td>
                    <td>
                      <div className="itemQuantity">
                        <button

                          disabled={user.cart[item._id || item.id] <= 0}
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
                      </div>
                    </td>
                    <td>
                      <div className="itemPrice">
                        ${item.price}
                      </div>
                    </td>
                    <td>
                      <div className="itemTotal">
                        $
                        {Number(
                          item.price * user.cart[item._id || item.id]
                        ).toFixed(2)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
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
