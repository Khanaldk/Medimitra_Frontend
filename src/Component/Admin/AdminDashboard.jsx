import React from "react";
import AdminNav from "./AdminNav";

const AdminDashboard = () => {
  return (
    <>
      <div className="flex">
        <div className="h-screen">
          <AdminNav />
        </div>
        <div>
          <h2>Welcome To Admin Dashboard</h2>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
