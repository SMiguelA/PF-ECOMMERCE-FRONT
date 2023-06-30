import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import style from './StarsRating.module.css';

export const StarsRating = ({dataForm, setDataForm, rat}) => {
  const [rating, setRating] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(null);
  useEffect(()=>{
    setHoveredRating(rat)
  },[])
    
  const handleMouseEnter = (value) => {
    setHoveredRating(value);
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  useEffect(() => {
    setDataForm({
        ...dataForm,
        rating: rating || rat
    })
  },[rating])

  return (
    <div className={style.container} key={rating}>
      {[...Array(5)].map((star, index) => {
        const value = index + 1;
        return (
          <label
            key={value}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
          >
            <input
              type="radio"
              name="rating"
              id={value}
              value={value}
              onClick={() => setRating(value)}
            />
            <FaStar
              color={
                (hoveredRating !== null ? value <= hoveredRating : value <= rating)
                  ? 'green'
                  : 'grey'
              }
            />
          </label>
        );
      })}
    </div>
  );
};
