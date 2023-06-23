import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { activeFilterCategory, filterProducts } from '../../../../Redux/Actions';
import style from './Categories.module.css';
import { categoriesData, categoriesText } from './categoriesData';


export const     Categories = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [filterData, setFilterData] = useState({
        filterCategory:"",
        filterPlatform:"",
        filterPrice:"",
        name:""
    });

    useEffect(() => {
        dispatch(filterProducts(filterData))
        dispatch(activeFilterCategory(filterData.filterCategory))
    },[filterData])

    const handlerClick = (event) => {
        const category = event.target.id;
        setFilterData({
            ...filterData,
            filterCategory: category
        });
        setTimeout(() => {
            navigate('/store');
        },150)
    }
    return    (
        <div className={style.container}>
            {
                [...Array(9)].map((c, index) => {
                    return(
                        <div key={index} className={style.cards} onClick={handlerClick} id={categoriesText[index]}>
                            <img src={categoriesData[index]} alt="img" />
                            <div className={style.capa} id={categoriesText[index]}>
                                <p id={categoriesText[index]}>{categoriesText[index]}</p>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}
