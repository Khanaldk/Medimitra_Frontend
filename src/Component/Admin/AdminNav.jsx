import React from "react";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen flex flex-col">
      {/* Sidebar Content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul>
          <li className="mb-4">
            <NavLink
              to="/adminDashboard"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 rounded bg-gray-900 text-white"
                  : "block py-2 px-4 rounded hover:bg-gray-700 text-gray-300"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/manageRole"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 rounded bg-gray-900 text-white"
                  : "block py-2 px-4 rounded hover:bg-gray-700 text-gray-300"
              }
            >
              Manage Role
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/adminpasswordChange"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 rounded bg-gray-900 text-white"
                  : "block py-2 px-4 rounded hover:bg-gray-700 text-gray-300"
              }
            >
              Change Password
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Logout Link at the Bottom */}
      <div>
        <NavLink
          to="/login"
          className="block py-2 my-4 mx-2 px-4 rounded text-white hover:bg-red-100 hover:text-red-700 hover:w-3/4"
        >
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default AdminNav;
