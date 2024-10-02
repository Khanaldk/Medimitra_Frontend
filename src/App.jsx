import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

import Login from "./Component/Layout/Login";
import Signup from "./Component/Layout/Signup";

import Home from "./Component/Layout/home";
import User from "./Component/user/user";
import ForgetPassword from "./Component/Layout/ForgetPassword";
import Moderator from "./Component/Moderator/Moderator";
import UserManagement from "./Component/Moderator/UserManagement";
import RecordManagement from "./Component/Moderator/recordManagement";
import ModeratorChat from "./Component/Moderator/ModeratorChat";
import Appoinment from "./Component/user/Appointment";
import VaccinationDetails from "./Component/user/VaccinationDetails";
import UserChat from "./Component/user/UserChat";
import ResetPassword from "./Component/Layout/Resetpassword";
import USerPasswordReset from "./Component/user/UserPasswordChange";
import AdminChangePassword from "./Component/Admin/AdminChangePassword";
import ModeratorChangePassword from "./Component/Moderator/ModeratorChangePassword";
import AdminDashboard from "./Component/Admin/AdminDashboard";
import ManageRole from "./Component/Admin/ManageRole";
import ProtectedRoute from "./Component/Layout/ProtectedRoute ";
import Unauthorized from "./Component/Layout/Unauthorized";

function App() {
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token || username) {
      const currentPath = location.pathname;
      console.log(currentPath);
      const protectedPath = [
        "/",
        "/signup",
        "/login",
        "/resetpassword",
        "/forgetPassword",
      ];
      if (protectedPath.includes(currentPath)) {
        console.log("token removed if includes!");
        localStorage.clear();
      }
    }
  }, [location]);
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />

        {/* user */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointment/:vaccinationId"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <Appoinment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userpasswordreset"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <USerPasswordReset />
            </ProtectedRoute>
          }
        />
        <Route
          path="/UserChat"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <UserChat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vaccinationdetails"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <VaccinationDetails />
            </ProtectedRoute>
          }
        />

        {/* Moderator route */}
        <Route
          path="/moderatorDashboard"
          element={
            <ProtectedRoute allowedRoles={["Moderator"]}>
              <Moderator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/moderatorpasswordreset"
          element={
            <ProtectedRoute allowedRoles={["Moderator"]}>
              <ModeratorChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usermanagement"
          element={
            <ProtectedRoute allowedRoles={["Moderator"]}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ModeratorChat"
          element={
            <ProtectedRoute allowedRoles={["Moderator"]}>
              <ModeratorChat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vaccinationRecord"
          element={
            <ProtectedRoute allowedRoles={["Moderator"]}>
              <RecordManagement />
            </ProtectedRoute>
          }
        />

        {/* Admin Route */}
        <Route
          path="/adminDashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminpasswordChange"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manageRole"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <ManageRole />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </>
  );
}

export default App;
