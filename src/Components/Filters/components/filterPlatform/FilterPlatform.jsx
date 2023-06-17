import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import style from './FilterPlatform.module.css';

export const FilterPlatform = ({ setFilterData, filterData }) => {

    const [isChecked, setIsChecked] = useState({});

    const allProducts = useSelector((state) => state.allProducts);
    const arrayPlatform = allProducts
        .map((object) => object.platform)
        .filter((category, index, array) => array.indexOf(category) === index);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        const updatedState = {
            ...isChecked,
            [name]: checked,
        };
        setIsChecked(updatedState);
    
        const selectedCategoriesArray = Object.keys(updatedState).filter(
            (category) => updatedState[category]
        );
        const selectedPlatformsString = selectedCategoriesArray.join("-");
        
        setFilterData({
            ...filterData,
            filterPlatform: selectedPlatformsString
        })

    };

    return (
        <div className={style.contenedor}>
            <span>Platform</span>
            {arrayPlatform.map((platform) => (
            <div key={platform} className={style.categorias}>
                <input
                className={style.inputs}
                type="checkbox"
                id={platform}
                name={platform}
                checked={isChecked[platform] || false}
                onChange={handleCheckboxChange}
                />
                <label htmlFor={platform}>{platform}</label>
            </div>
            ))}
        </div>
    )
}
