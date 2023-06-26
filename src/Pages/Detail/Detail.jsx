import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { addToCart, deletProductId, getProductById } from "../../Redux/Actions";
import axios from "../../axios";
import style from "./Detail.module.css";
import Galery from "./components/Galery";
import { Reviews } from "./components/Reviews/Reviews";
import Starts from "./components/Starts";
import { About } from "./components/about/About";
import { FormRating } from "./components/formRating/FormRating";


export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const { '*': ruta } = useParams();
  const [bandera, setBandera] = useState(ruta);

  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct(data);
    });
  }, [id]);

  const { productId } = useSelector((state) => state);
  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }

    return () => dispatch(deletProductId());
  }, [id]);

  useEffect(() => {
    setBandera(ruta)
  },[ruta])

    // Add to Cart Notification.
    const notify = () =>
    toast("Game added to cart!", {
      icon: "🎮",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#333",
      },
      duration: 3000,
      position: "bottom-right",
    });

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (user && user._id) {

      notify()
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

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      {
      
      user && user.isActive ? productId && productId.name ? (
        <div className={style.container}>
          <div className={style.contLeft}>
            <h1>{productId.name}</h1>
            <button onClick={handleAddToCart}>
              <label>Add to </label><label className={style.labelStyle}> My Cart </label>
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
                <h2>Platform</h2>
                <p>{productId.platform}</p>
              </div>
            </div>
            <Starts rating={productId.rating || 3.5} />
          </div>
          <div className={style.contRight}>
            <Galery imgs={productId.pictures} />
          </div>
          <hr className={style.hrPrimero}/>



          <div className={style.seccionesDetail}>
            <div onClick={() => handleNavigation(`about`)} className={bandera == 'about' || bandera == '' ? style.acercaDE : ''}>
              <label>About</label>
            </div>
            <div onClick={() => handleNavigation(`reviews`)} className={bandera == 'reviews' ? style.reviewsStyle : ''}>
              <label>Ratings and reviews</label>
            </div>
            {
              user 
              && <div onClick={() => handleNavigation(`rating`)} className={bandera == 'rating' ? style.ratingStyle : ''}>
                  <label>Rate this game</label>
                 </div>
            }
          </div>

          <hr className={style.hrSegundo}/>

          <Routes>
            <Route path="/" element={<About description={productId.description}/>}/>
            <Route path="/*" element={<About description={productId.description}/>}/>
            <Route path="/about" element={<About description={productId.description}/>} />
            <Route path="/reviews" element={<Reviews data={productId.valorations} id={productId._id}/>} />
            {
              user && <Route path="/rating" element={
              <>
                <FormRating user={user} product={productId}/>
                <Reviews data={productId.valorations}/>
              </>
              } />
            }
          </Routes>

        </div>
      ) : (
        <h1 style={{ color: "white" }}>Loading...</h1>
      )
    
      : navigate('/banned')
    
    }
    </>
  );
}
