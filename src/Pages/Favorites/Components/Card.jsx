import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { A11y, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import defaultImg from "../../../img/default.jpg";
import { addToCart } from "../../../Redux/Actions";
import style from "./Card.module.css";

const Card = ({ data }) => {
  // Data.
  const { _id } = data;
  const formattedPrice = data.price.toLocaleString();

  const dispatch = useDispatch();

  // States.
  const user = useSelector((state) => state.user);

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

  // Add to Cart Function.
  const handleAddToCart = (event) => {
    // Reset Event.
    event.preventDefault();

    // If User exist.
    if (user && user._id) {
      // Notify.
      notify();

      dispatch(
        addToCart({
          userId: user._id,
          productId: _id,
          price: data.price,
        })
      );
    }
  };

  return (
    <Link to={`detail/${_id}`} style={{ textDecoration: "none" }}>
      <div className={style.container} key={data.id}>
        <div className={style.containerImgs}>
          <Swiper
            className={style.tamano}
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            {data.pictures.map((picture) => (
              <SwiperSlide key={picture}>
                {(typeof picture === "string" && picture.endsWith(".jpg")) ||
                picture.endsWith(".jpeg") ||
                picture.endsWith(".gif") ||
                picture.endsWith(".png") ? (
                  <img className={style.imgs} src={picture} alt={data.name} />
                ) : (
                  <img
                    className={style.imgs}
                    src={defaultImg}
                    alt={data.name}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={style.info}>
          <div>
            <h2>{data.name}</h2>
            <h3 className={style.price}>${formattedPrice}</h3>
          </div>
          <div>
            <button
              onClick={(event) => handleAddToCart(event)}
              className={style.addToCart}
            >
              Add
            </button>
          </div>
        </div>
        <div className={style.infoSecundaria}>
          <article>
            <p>Category: </p>
            <p>{data.category}</p>
          </article>
          <hr />
          <article className={style.stock}>
            <p>Stock: </p>
            <p>{data.stock}</p>
          </article>
        </div>
      </div>
    </Link>
  );
};

export default Card;
