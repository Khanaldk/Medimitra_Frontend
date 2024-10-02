import React, { useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import Button from "../Layout/Button";
import GetAuthToken from "../Layout/GetAuthToken";
import { useChangeUserRoleMutation } from "../../Service/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ManageRole = () => {
  const navigate = useNavigate();
  const token = GetAuthToken();
  const [formErrors, setFormErrors] = useState({});
  const [logdata, setData] = useState({ Email: "", NewRole: "" });
  const [updateRole, responseInfo] = useChangeUserRoleMutation();
  console.log(responseInfo?.data?.data);
  console.log(responseInfo?.error?.data);

  useEffect(() => {
    if (responseInfo?.data?.data) {
      toast.success("User Role Changed Successfully.");
      setFormErrors({});
      setData({});
      navigate("/manageRole");
    }
    if (!token) {
      navigate("/login");
    }

    if (responseInfo?.error?.data?.type == "InvalidEmail") {
      setFormErrors((prevErrors) => ({
        Email: responseInfo?.error?.data?.message,
      }));
    }

    if (responseInfo?.error?.data?.type == "InvalidRoleAssign") {
      setFormErrors((prevErrors) => ({
        NewRole: responseInfo?.error?.data?.message,
      }));
    }
  }, [responseInfo?.data, responseInfo?.error, !token]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRole(logdata);
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  return (
    <>
      <div className="flex">
        <div>
          <AdminNav />
        </div>
        <div className="w-full mt-20">
          <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Change Role</h2>
            <form onSubmit={HandleSubmit}>
              <div className="mb-2">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="Email"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="Email"
                  value={logdata.Email || ""}
                  onChange={HandleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  placeholder="Enter user's email"
                />
              </div>
              {formErrors.Email && (
                <span className="text-red-500 text-sm mt-1">
                  {formErrors.Email}
                </span>
              )}

              <div className="mb-2">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="role"
                >
                  Role
                </label>
                <input
                  type="text"
                  id="Role"
                  name="NewRole"
                  required
                  value={logdata.NewRole || ""}
                  onChange={HandleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter new role (e.g., Admin, Moderator, User)"
                />
              </div>
              {formErrors.NewRole && (
                <span className="text-red-500 text-sm mt-1">
                  {formErrors.NewRole}
                </span>
              )}

              <Button
                disabled={responseInfo?.isLoading}
                style="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-2 rounded focus:outline-none focus:shadow-outline w-full"
                text={
                  responseInfo?.isLoading ? "Role Changing.." : "Change Role"
                }
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageRole;
