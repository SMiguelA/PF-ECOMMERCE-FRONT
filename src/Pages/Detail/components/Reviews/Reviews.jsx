import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductById } from "../../../../Redux/Actions";
import Starts from "../Starts";
import style from "./Reviews.module.css";

export const Reviews = ({ data, id }) => {
  const sortedData = data?.sort((a, b) => new Date(a.date) - new Date(b.date));
  const distpatch = useDispatch();

  useEffect(() => {
    id && distpatch(getProductById(id));
  }, []);

  console.log(data);

  return (
    <div className={style.container}>
      {sortedData.length ? (
        sortedData.map((review) => {
          const fehcaReview = new Date(review.date);
          let dia = fehcaReview.getDate();
          let mes = fehcaReview.getMonth() + 1;
          let anio = fehcaReview.getFullYear();

          const fecha = `${dia}/${mes}/${anio}`;

          const uperCaseLetter = review.id_cliente.name[0].toUpperCase();

          return (
            <div key={review._id} className={style.reviewContent}>
              <div className={style.nameInfo}>
                <h1 className={style.letter}>{uperCaseLetter}</h1>
                <h1>{review.id_cliente.name}</h1>
              </div>
              <div className={style.starsDate}>
                <Starts rating={review.rating} />
                <h4>{fecha}</h4>
              </div>
              <label>{review.comment}</label>
            </div>
          );
        })
      ) : (
        <>This product dont have reviews to show</>
      )}
    </div>
  );
};
