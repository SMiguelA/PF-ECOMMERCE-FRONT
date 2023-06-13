import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

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
            }, 400)
        );
        
    }, [product]);

    return (
        <div className="filter">
            <input
            type="text"
            value={product}
            onChange={NameHandleInputChange}
            />
        </div>
    )
}
