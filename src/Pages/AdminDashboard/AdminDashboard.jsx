import React, { useState } from "react";
import TableAdmin from "../../Components/Table/TableAdmin";
import TableUsers from "../../Components/Table/TableUsers";

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
            <li onClick={() => handleTabChange("users")}>Users</li>
            <li onClick={() => handleTabChange("clients")}>Orders</li>
          </ul>
        </div>
        <div>
          {activeTab === "products" && <TableAdmin />}
          {activeTab === "users" && <TableUsers />}
          {/* {activeTab === "orders" && <OrdersAdminPage />}
          {activeTab === "clients" && <ClientsAdminPage />} */}
        </div>
      </div>
    </>
  );
}
