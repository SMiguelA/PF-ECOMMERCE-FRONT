import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from '../../../axios';
import './userTable.css';

export const UsersTable = ({data, galleta, setGalleta}) => {

    const [bandera, setBandera] = useState(null);
    const info = data.filter((dato) =>{
        return dato.email !== 'admin@hotmail.com'
    })

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable:true
        },
        {
            name: 'Status', 
            cell: (row) => (
                <p>{row.isActive ? 'Active' : 'Banned'}</p> 
            ),
            sortable:true
        },
        {
            name: 'N. Orders',
            selector: row => row.__v,
            sortable:true
        },
        {
            name: 'Action', cell:(row) => (
            bandera && bandera.email === row.email 
            ? row.isActive 
            ? <button id={row._id} name={row.isActive.toString()} className='banButton' onClick={handlerChangeState}>Ban</button>
            : <button id={row._id} name={row.isActive.toString()} className='unbanButton' onClick={handlerChangeState}>Unban</button>
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
        theme='dark'
        pagination={true}
        onRowClicked={handlerClick}
        paginationPerPage={10}
        />
    )
}
