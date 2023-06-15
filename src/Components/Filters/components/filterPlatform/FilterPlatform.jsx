import React, { useState } from 'react';
import { useSelector } from 'react-redux';

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
        <div>
            {arrayPlatform.map((platform) => (
            <div className="checkbox" key={platform}>
                <input
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
