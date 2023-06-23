import React, { useState } from 'react';
import { toast } from "react-hot-toast";
import { BsInfoCircle } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createReviewAction } from '../../../../Redux/Actions';
import style from './FormRating.module.css';
import { StarsRating } from './starReview/StarsRating';

export const FormRating = ({user, product}) => {
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const date = new Date()
  const {_id, name} = product;
  

  const [dataForm, setDataForm] = useState({
    rating: null,
    description: '',
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
      dispatch(createReviewAction(dataForm))
      
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
        <h2>Write a review for {name}</h2>
        <div className={style.infoUser}>
          <h1>{user.name[0].toUpperCase()}</h1>
          <div>
            <h2>{user.name}</h2>
            <h2>{user.email}</h2>
          </div>
        </div>
        <p>Reviews are public and include your account info <BsInfoCircle /></p>
        <StarsRating setDataForm={setDataForm} dataForm={dataForm}/>
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
          <button className={style.submit} type='submit'>Send</button>
          <button onClick={(event) => handleNavigation(`/store/detail/${_id}/reviews`,event)} className={style.cancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
