import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import "./ProductsAdminPage.css";

import { deleteProduct } from "../../../Redux/Actions";
function ProductsAdminPage() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.allProducts);
  const user = useSelector((state) => state.user);

  function handleDeleteProduct(id) {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct({ product_id: id, user_id: user._id }));
    }
  }

  function TableRow({ pictures, id, name, price }) {
    return (
      <tr>
        <td>
          <img
            src={pictures[0]}
            className="dashboard-product-preview"
            alt="Product Preview"
          />
        </td>
        <td>{id}</td>
        <td>{name}</td>
        <td>{price}</td>
        <td>
          <button onClick={() => handleDeleteProduct(id, user._id)}>
            Delete
          </button>
          <Link to={`/product/${id}/edit`}>Edit</Link>
        </td>
      </tr>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <Pagination
          data={products}
          RenderComponent={TableRow}
          pageLimit={1}
          dataLimit={5}
          tablePagination={true}
        />
      </tbody>
    </table>
  );
}

export default ProductsAdminPage;
