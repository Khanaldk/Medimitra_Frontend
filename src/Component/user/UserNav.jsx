import React from "react";
import { NavLink } from "react-router-dom"; // Use NavLink for active class support

function UserNavbar() {
  return (
    <div className="flex flex-col min-h-screen w-64 bg-gray-800 shadow-lg p-6">
      {/* Top Section */}
      <div className="mb-8 text-white">
        <div className="text-2xl font-bold mb-8">User Dashboard</div>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/user"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 rounded bg-gray-900 text-white"
                  : "block py-2 px-4 rounded hover:bg-gray-700 text-gray-300"
              }
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/vaccinationDetails"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 rounded bg-gray-900 text-white"
                  : "block py-2 px-4 rounded hover:bg-gray-700 text-gray-300"
              }
            >
              Upcoming Vaccination
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/UserChat"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 rounded bg-gray-900 text-white"
                  : "block py-2 px-4 rounded hover:bg-gray-700 text-gray-300"
              }
            >
              Chat
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/userpasswordreset"
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

      {/* Spacer */}
      <div className="flex-grow"></div>

      {/* Logout Section */}
      <div>
        <NavLink
          to="/login"
          className="block py-2 px-4 rounded text-white hover:bg-red-100 hover:text-red-700"
        >
          Logout
        </NavLink>
      </div>
    </div>
  );
}

export default UserNavbar;
