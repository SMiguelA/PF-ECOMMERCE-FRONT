import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, openEditReview } from "../../../../Redux/Actions";
import Starts from "../Starts";
import style from "./Reviews.module.css";
import { useNavigate } from "react-router-dom";

export const Reviews = ({ data, id, user }) => {
  const {notReview} = useSelector((state) => state)
  const sorted = data?.sort((a, b) => new Date(a.date) - new Date(b.date));
  const allDate = sorted.filter((ele) => ele?.id_cliente._id !== user?._id)
  const userDate = sorted.filter((ele) => ele?.id_cliente._id === user?._id)
  const sortedData = [...userDate, ...allDate]
  const {openEdit} = useSelector((state) => state)
  const dispatch = useDispatch();
const navigate = useNavigate()
  useEffect(() => {
    id && dispatch(getProductById(id));
  }, []);
  const handlerEdit = () =>{
    
    dispatch(openEditReview(!openEdit))
   navigate(`/store/detail/${id}/edit`)
  }


  return (
    <div className={style.container}>
      {sortedData.length ? (
        sortedData.map((review, index) => {
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
              {!notReview && index === 0 ? <button onClick={handlerEdit}>Edit</button> : ""}
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
