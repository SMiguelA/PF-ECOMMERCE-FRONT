import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
console.log(userCartObj);
 //estados locales para procesar el botton de decremento
 const [isButtonDissabled, setIsButtonDissabled] = useState(false);
 const [isProcessing, setIsProcessing] = useState(false); 

  const [cart, setCart] = useState(null);
 
  useEffect(() => {
    let cartt = Object.keys(userCartObj)
      .map((productId) => {
        const product = products.find((product) => {
          let bandera = product.id === productId || product._id === productId;

          return bandera;
        });

        if (product) {
          return {...product, };
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
    if(!isProcessing){
      setIsProcessing(true);
      setIsButtonDissabled(true);
    }

    if (quantity <= 0) return alert("Press Remove");
    else {
      dispatch(decreaseCart(product));
    }

    setTimeout(()=>{
      setIsProcessing(false);
      setIsButtonDissabled(false);
    }, 1000)

  }

  function handleIncrease(product) {
    dispatch(increaseCart(product));
  }

  function handleRemoveFromCart(product) {
    dispatch(removeFromCart(product));
  }

  return (
    <div style={{ minHeight: "100%" }} className="contenedorCart">
      {
      
      user.isActive ?
      cart?.length ? (
        <div className="infoContainer">
          <div className="stripeContainer">
            <h1>Order Summary</h1>
            <hr />
            <Elements stripe={stripePromise}>
              <CheckoutForm 
              data={user.cart.total ? user.cart.total : 0}
              cart={user.cart}
              />
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
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {/* loop through cart products */}
                {cart.map((item) => (
                  <tr key={item._id || item.id} className="itemContainer">
                    {console.log(item.stock)}
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
                      <div className={user.cart[item._id || item.id] >= 2 ? "itemQuantity" : 'itemQuantity2'}>
                        
                        {
                          user.cart[item._id || item.id] >= 2
                          ?
                          <div>
                            <button
                              disabled={isButtonDissabled}
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
                          </div>
                          :<></>
                        }
                        <span>{user.cart[item._id || item.id]}</span>
                        <button
                          onClick={() => {
                            handleIncrease({
                              productId: item._id || item.id,
                              price: item.price,
                              userId: user._id || user.id,
                              stock: item.stock
                            });
                          }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <div >
                        {item.stock - user.cart[item._id || item.id] !== 0 ? 
                       <div className="itemStock"> {item.stock - user.cart[item._id || item.id] }</div> : 
                       <div className="itemStock2">{ item.stock - user.cart[item._id || item.id]} </div>}
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
      )
    
      : navigate('/banned')
    
    }
    </div>
  );
}

export default Cart;
