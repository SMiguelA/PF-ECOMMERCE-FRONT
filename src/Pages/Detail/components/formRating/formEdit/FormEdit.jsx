import React, { useState } from 'react';
import { toast } from "react-hot-toast";
import { BsInfoCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import style from './FormRating.module.css';
import { StarsRating } from '../starReview/StarsRating';
import { editReviewAction } from '../../../../../Redux/Actions';

export const FormEdit = ({user, product}) => {
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
 

  const rating = product.valorations.find((val) => val.id_cliente._id === user._id)

  const date = new Date()
  const {_id, name} = product;
  

  const [dataForm, setDataForm] = useState({
    rating: null,
    description: rating.comment,
    id_cliente: user._id || user.id,
    date,
    id_product: _id
  })

  const handleNavigation = (path, event) => {
    event.preventDefault();
    setFadeOut(true);
    setTimeout(() => {
      navigate(path);
    }, 250);
  };

  const handlerDescription = (event) => {
    event.preventDefault();
    setDataForm({
      ...dataForm,
      description:event.target.value
    })
  }

  const notify = () =>
    toast("Review created succesfully!", {
      icon: "☑",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#333",
      },
      duration: 3000,
      position: "bottom-right",
    });

  const handlerSubmit = (event) => {
    event.preventDefault();
    if(!dataForm.rating || !dataForm.description){
      
      alert('Complete form data to procede');
    }else{
      
      dispatch(editReviewAction(dataForm))
      
      notify()
      setFadeOut(true);
      setTimeout(() => {
        navigate(`/store/detail/${_id}/reviews`);
      }, 250);
    }
  }

  return (
    <div className={style.container}>
      <form className={fadeOut ? style.containerFormFade : style.containerForm} onSubmit={handlerSubmit}>
        <h2>Edit your {name} review</h2>
        <div className={style.infoUser}>
          <h1>{user.name[0].toUpperCase()}</h1>
          <div>
            <h2>{user.name}</h2>
            <h2>{user.email}</h2>
          </div>
        </div>
        <p>Reviews are public and include your account info <BsInfoCircle /></p>
        <StarsRating rat={rating.rating} setDataForm={setDataForm} dataForm={dataForm}/>
        <textarea 
          name="descreiption" 
          id="descreiption" 
          cols="30" 
          rows="10" 
          placeholder='Describe your experience'
          onChange={handlerDescription}
          value={dataForm.description}
        >
        </textarea>
        <div className={style.buttons}>
          <button className={style.submit} type='submit'>Edit</button>
          <button onClick={(event) => handleNavigation(`/store/detail/${_id}/reviews`,event)} className={style.cancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
