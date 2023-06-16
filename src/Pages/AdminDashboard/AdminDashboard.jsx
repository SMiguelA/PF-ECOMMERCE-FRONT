import React, { useState } from "react";
import ProductsAdminPage from "../../Components/AdminPage/ProductsAdminPage/ProductsAdminPage";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");

  const handleTabChange = (type) => {
    setActiveTab(type);
  };
  return (
    <>
      <h1>1</h1>
      <h1>1</h1>
      <h1>Admin Dashboard</h1>
      <div>
        <div>
          <ul>
            <li onClick={() => handleTabChange("products")}>Products</li>
            <li onClick={() => handleTabChange("orders")}>Orders</li>
            <li onClick={() => handleTabChange("clients")}>Clients</li>
          </ul>
        </div>
        <div>
          {activeTab === "products" && <ProductsAdminPage />}
          {/* {activeTab === "orders" && <OrdersAdminPage />}
          {activeTab === "clients" && <ClientsAdminPage />} */}
        </div>
      </div>
    </>
  );
}
