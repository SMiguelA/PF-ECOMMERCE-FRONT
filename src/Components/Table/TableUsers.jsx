import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Table, { Direction } from "react-data-table-component";

const TableUsers = () => {
  const [data, setData] = useState([]);
  const users = useSelector((state) => state.users);
  console.log(users);
  const columns = [
    { name: "User ID", selector: (row) => row.id, sortable: true },
    { name: "User Name", selector: (row) => row.name, sortable: true },
    { name: "User Email	", selector: (row) => row.email, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button>{row.id}</button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (!users.length) {
      setData([0]);
    } else {
      setData(users);
    }
  }, [users]);

  const typeStatus = [
    {
      id: "banned",
      name: "banned",
    },
    {
      id: "active",
      name: "active",
    },
    {
      id: "innactive",
      name: "innactive",
    },
  ];

  return (
    <>
      {data.length ? (
        <Table
          columns={columns}
          data={data}
          direction={Direction.AUTO}
          highlightOnHover={true}
          pointerOnHover={true}
          pagination={true}
          paginationPerPage={5}
        />
      ) : (
        <h1>Loading ...</h1>
      )}
    </>
  );
};

export default TableUsers;
