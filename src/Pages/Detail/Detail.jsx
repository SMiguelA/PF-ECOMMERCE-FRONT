import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { addToCart, deletProductId, getProductById } from "../../Redux/Actions";
import axios from "../../axios";
import style from "./Detail.module.css";
import Galery from "./components/Galery";
import Starts from "./components/Starts";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct(data);
    });
  }, [id]);

  const { productId } = useSelector((state) => state);
  useEffect(() => {
    if (id) dispatch(getProductById(id));

    return () => dispatch(deletProductId());
  }, [id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    console.log("antes del if de handleadd");
    if (user && user._id) {
      console.log("entro al handleAddtocart");
      // Check if user and user._id exist
      dispatch(
        addToCart({
          userId: user._id,
          productId: id,
          price: product.price,
        })
      );
    }
  };

  return (
    <>
      {productId.name ? (
        <div className={style.container}>
          <div className={style.contLeft}>
            <h1>{productId.name}</h1>
            <button onClick={handleAddToCart}>
              Add to <span> My Cart </span>
            </button>
            <div className={style.info}>
              <div>
                <h2>Stock</h2>
                <p>{productId.stock || 0}</p>
              </div>
              <hr />
              <div>
                <h2>Category</h2>
                <p>{productId.category}</p>
              </div>
              <hr />
              <div>
                <h2>Genre</h2>
                <p>{productId.gender}</p>
              </div>
            </div>
            <Starts rating={productId.rating || 3.5} />
            <div className={style.about}>
              <h1 style={{ color: "#fff" }}>About</h1>
              <p>{productId.description}</p>
            </div>
          </div>
          <div className={style.contRight}>
            <Galery imgs={productId.pictures} />
          </div>
        </div>
      ) : (
        <h1 style={{ color: "white" }}>Loading...</h1>
      )}
    </>
  );
}
