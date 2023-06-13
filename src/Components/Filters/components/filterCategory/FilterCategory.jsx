import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export const FilterCategory = ({ setFilterData, filterData }) => {

    const [isChecked, setIsChecked] = useState({});

    const allProducts = useSelector((state) => state.allProducts);
    const arrayCategory = allProducts
        .map((object) => object.category)
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
        const selectedCategoriesString = selectedCategoriesArray.join("-");
        
        setFilterData({
            ...filterData,
            filterCategory: selectedCategoriesString
        })

    };

    return (
        <div>
            {arrayCategory.map((category) => (
                <div className="checkbox" key={category}>
                <input
                    type="checkbox"
                    id={category}
                    name={category}
                    checked={isChecked[category] || false}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor={category}>{category}</label>
                </div>
            ))}
        </div>
    )
}