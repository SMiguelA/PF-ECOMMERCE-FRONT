import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProducts } from '../../Redux/Actions';
import style from './DashboardAdminUserProduct..module.css';
import { ProductsTable } from './components/ProductsTable';
import { UsersTable } from './components/UsersTable';

export const DashboardAdminUserProduct = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state.dataDashAdmin);
    const [type, setType] = useState('users'); 
    const [galleta, setGalleta] = useState(true);

    useEffect(() => {
        dispatch(getUserProducts());
    },[galleta])

    const handleChange = (event) => {
        setType(event.target.value);
    }
    
    return (
        <div className={style.container}>
            <div className={style.contSelect}>
                <select onChange={handleChange}>
                    <option value="users" selected>Users</option>
                    <option value="products">Products</option>
                </select>
            </div>
            {
                state 
                ? type === 'users'
                ? <UsersTable data={state.usersAll} galleta={galleta} setGalleta={setGalleta} />
                : <ProductsTable data={state.productsAll} galleta={galleta} setGalleta={setGalleta} /> 
                : <h1>Loading...</h1>
            }
        </div>
    )
}
