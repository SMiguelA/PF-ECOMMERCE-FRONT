import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { activeFilterName } from '../../../../Redux/Actions';
import style from './FilterName.module.css';

export const FilterName = ({ setFilterData, filterData }) => {

    const [product, setProduct] = useState("");
    const [timer, setTimer] = useState(null);

    const dispatch = useDispatch();

    const NameHandleInputChange = (e) => {

        setProduct(e.target.value);
    
    };

    useEffect(() => {

        if (timer) {
            clearTimeout(timer);
        }
        
        setTimer(
            setTimeout(() => {
                setFilterData({
                    ...filterData,
                    name:product
                })
                dispatch(activeFilterName(product))
            }, 400)
            );
        
    }, [product]);

    return (
        <div className={style.container}>
            <span>Name of the product</span>
            <input
            type="text"
            value={product}
            onChange={NameHandleInputChange}
            />
        </div>
    )
}
