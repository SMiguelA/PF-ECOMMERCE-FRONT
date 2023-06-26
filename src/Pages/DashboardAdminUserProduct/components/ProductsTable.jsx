import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from '../../../axios';
import averageGrades from '../../../utils/averageGrades';
import style from './UserTable.module.css';

export const ProductsTable = ({data, galleta, setGalleta}) => {

    const [bandera, setBandera] = useState(null);
    const info = data.filter((dato) =>{
        return dato.email !== 'admin@hotmail.com'
    })

    const columns = [
        {
          name: 'Image',
          cell: (row) => (
            <img src={row.pictures[0]} alt="Avatar" style={{ width: '5em', marginRight: '1em', borderRadius: '2em' }} />
          ),
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Stock',
            selector: row => row.stock,
            sortable:true
        },
        {
            name: 'Status', 
            cell: (row) => (
                <p>{row.isActive ? 'Available' : 'Not Available'}</p>
            ),
            sortable:true
        },
        {
            name: 'N. Orders',
            selector: row => row.__v,
            sortable:true
        },
        {
            name: 'Rating',
            cell: (row) => {
              let rating = averageGrades(row.valorations)
              return (<>{rating}</>)
            },
            sortable:true
        },
        {
            name: 'Action', cell:(row) => (
            bandera && bandera._id === row._id 
            ? row.isActive 
            ? <button id={row._id} name={row.isActive.toString()} className={style.button} onClick={handlerChangeState}>Disable</button>
            : <button id={row._id} name={row.isActive.toString()} className={style.buttonUndo} onClick={handlerChangeState}>Enable</button>
            :<></>
            )
        }
    ]

    const handlerClick = (row) => {
        setBandera(row);
    }

    const handlerChangeState = (event) => {
        axios.put(`/admin/${event.target.id}?type=user&isActive=${event.target.name}`)
        .then((data) => {
            setGalleta(!galleta);
        }
        ).catch((error) => alert(error))
    }

    return (
        <DataTable 
        columns={columns}
        data={info}
        highlightOnHover={true}
        pointerOnHover={true}
        pagination={true}
        onRowClicked={handlerClick}
        paginationPerPage={10}
        />
    )
}
