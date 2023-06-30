import React from 'react';
import img from '../../img/bannedImg.png';
import style from './BannedView.module.css';

export const BannedView = () => {
  return (
    <div className={style.container}>
      <div className={style.informationBan}>
        <h1>Banned Account</h1>
        <p>Your account has been Banned for the administration of the website, please contact with our support for more information</p>
      </div>
      <img src={img} alt="img" />
    </div>
  )
}
