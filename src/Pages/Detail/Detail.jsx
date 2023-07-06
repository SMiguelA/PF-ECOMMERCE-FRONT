import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { connect, useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
  addFavorite,
  addToCart,
  deletProductId,
  getProductById,
  removeFavorite,
} from "../../Redux/Actions";
import axios from "../../axios";
import style from "./Detail.module.css";
import Galery from "./components/Galery";
import { Reviews } from "./components/Reviews/Reviews";
import Starts from "./components/Starts";
import { About } from "./components/about/About";
import { FormRating } from "./components/formRating/FormRating";

import { verifyNotReview } from "../../Redux/Actions";
import averageGrades from "../../utils/averageGrades";
import { FormEdit } from "./components/formRating/formEdit/FormEdit";

function Detail({ addFavorite, removeFavorite, myFavorites }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const { "*": ruta } = useParams();
  const [bandera, setBandera] = useState(ruta);

  const { openEdit } = useSelector((state) => state);

  const [isFav, setIsFav] = useState(false);
  const { productId } = useSelector((state) => state);

  const [purchasedGame, setPurchasedGame] = useState("");

  const notifyToLogin = () =>
    toast("You must be registered to view the product!", {
      icon: "🚧",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#333",
      },
      duration: 3000,
      position: "bottom-right",
    });

  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct(data);
    });
  }, [id]);

  const { notReview } = useSelector((state) => state);

  let arrayRating = [];
  if (productId && productId.valorations) {
    productId.valorations.map((val) => {
      arrayRating.push(val.rating);
    });
  }
  let ratingValue = averageGrades(arrayRating);
  ratingValue = Number(ratingValue.toString().substring(0, 3));

  useEffect(() => {
    if (user) {
      if (id) {
        dispatch(getProductById(id));
        axios.get(`orders?id=${user._id}`).then(({ data }) => {
          const itemBought = data.find((value) => value === id);
          if (itemBought) {
            setPurchasedGame(itemBought);
          }
        });
      }
    }

    return () => dispatch(deletProductId());
  }, [id]);

  useEffect(() => {
    setBandera(ruta);
  }, [ruta]);

  useEffect(() => {
    if (user) {
      myFavorites?.forEach((fav) => {
        if (fav._id === id) {
          setIsFav(true);
        }
      });
    }
  }, [myFavorites]);

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
      notify();
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

  const handlerNavigationRate = () => {
    if (notReview) {
      navigate("rating");
    }
  };

  useEffect(() => {
    if (productId && productId.valorations && user) {
      const comprobation = productId?.valorations?.find(
        (val) => val.id_cliente?._id === user?._id
      );

      //agregar el operador ? para que pueda tener el valor

      if (comprobation !== undefined) {
        dispatch(verifyNotReview(false));
      } else {
        dispatch(verifyNotReview(true));
      }
    }
  }, [productId, user, dispatch]);

  const notifyFav = () =>
    toast("Game added to favorites!", {
      icon: "💓",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#333",
      },
      duration: 3000,
      position: "bottom-right",
    });

  const notifyNotFavorite = () =>
    toast("Game removed from favorites!", {
      icon: "💔",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#333",
      },
      duration: 3000,
      position: "bottom-right",
    });

  const handdleFavorite = () => {
    if (user) {
      if (isFav) {
        setIsFav(false);
        removeFavorite(user, productId);
        notifyNotFavorite();
      } else {
        setIsFav(true);
        addFavorite(user, productId);
        notifyFav();
      }
    }
  };

  return (
    <>
      {console.log(user)}
      {user ? (
        user.isActive ? (
          productId && productId.name ? (
            <div className={style.container}>
              <div className={style.contLeft}>
                <h1>{productId.name}</h1>
                {user &&
                productId.stock > 0 &&
                productId.isActive &&
                user.isActive &&
                !user.isAdmin ? (
                  <div className={style.contOptions}>
                    <button onClick={handleAddToCart}>
                      <label>Add to </label>
                      <label className={style.labelStyle}> My Cart </label>
                    </button>
                    {isFav ? (
                      <AiFillHeart
                        onClick={handdleFavorite}
                        className={style.favoritesStyle}
                      />
                    ) : (
                      <AiOutlineHeart
                        onClick={handdleFavorite}
                        className={style.favoritesStyle}
                      />
                    )}
                  </div>
                ) : (
                  <></>
                )}
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
                <Starts rating={ratingValue || 0} />
              </div>
              <div className={style.contRight}>
                <Galery imgs={productId.pictures} />
              </div>
              <hr className={style.hrPrimero} />

              <div className={style.seccionesDetail}>
                <div
                  onClick={() => handleNavigation(`about`)}
                  className={
                    bandera === "about" || bandera === ""
                      ? style.acerca
                      : style.acercaDE
                  }
                >
                  <label style={{ cursor: "pointer" }}>About</label>
                </div>
                <div
                  onClick={() => handleNavigation(`reviews`)}
                  className={
                    bandera === "reviews" ? style.reviewsStyle : style.reviews
                  }
                >
                  <label style={{ cursor: "pointer" }}>
                    Ratings and reviews
                  </label>
                </div>
                {user && purchasedGame == id ? (
                  <div
                    onClick={() => handlerNavigationRate()}
                    className={
                      bandera === "rating"
                        ? style.notRateGame
                        : notReview
                        ? style.rateGame
                        : style.rateDisabled
                    }
                  >
                    <label>Rate this game</label>
                  </div>
                ) : (
                  <div className={style.rateDisabled}>
                    <label>Rate this game</label>
                  </div>
                )}
              </div>

              <hr className={style.hrSegundo} />

              <Routes>
                <Route
                  path="/"
                  element={<About description={productId.description} />}
                />
                <Route
                  path="/*"
                  element={<About description={productId.description} />}
                />
                <Route
                  path="/about"
                  element={<About description={productId.description} />}
                />
                <Route
                  path="/reviews"
                  element={
                    <Reviews
                      data={productId.valorations}
                      id={productId._id}
                      user={user}
                    />
                  }
                />
                {user && (
                  <Route
                    path="/rating"
                    element={
                      <>
                        <FormRating user={user} product={productId} />
                        <Reviews data={productId.valorations} />
                      </>
                    }
                  />
                )}
                <Route
                  path="/edit"
                  element={<FormEdit user={user} product={productId} />}
                />
              </Routes>
            </div>
          ) : (
            <h1 style={{ color: "white" }}>Loading...</h1>
          )
        ) : (
          navigate("/banned")
        )
      ) : (
        navigate("/")
      )}
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (user, product) => {
      dispatch(addFavorite(user, product));
    },
    removeFavorite: (user, product) => {
      dispatch(removeFavorite(user, product));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    myFavorites: state.myFavorites,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
