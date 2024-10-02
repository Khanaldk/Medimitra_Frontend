import React, { useState, useEffect } from "react";
import Button from "../Layout/Button";
import UserNav from "./UserNav";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../Service/authApi";
import toast from "react-hot-toast";

const PasswordChangeForm = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [logdata, setData] = useState({
    OldPassword: "",
    NewPassword: "",
    ConfirmNewPassword: "",
  });
  const [loginData, { data, error, isLoading }] = useChangePasswordMutation();
  console.log(data);
  console.log(error);

  useEffect(() => {
    if (error?.data?.type == "OldPassword") {
      setFormErrors((prevErrors) => ({
        OldPassword: error?.data?.message,
      }));
    }
    if (data) {
      toast.success("Password changed successfully.");
      setFormErrors({});
      setData({});
      navigate("/userpasswordreset");
    }
    if (error?.data?.errors?.NewPassword) {
      setFormErrors((prevErrors) => ({
        NewPassword: error?.data?.errors?.NewPassword.join(", "),
      }));
    }
    if (error?.data?.errors?.ConfirmNewPassword) {
      setFormErrors((prevErrors) => ({
        ConfirmNewPassword: error?.data?.errors?.ConfirmNewPassword.join(", "),
      }));
    }
  }, [error, data]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("logdata");
      console.log(logdata);

      await loginData(logdata);
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
          <UserNav />
        </div>
        <div className="w-full mt-20">
          <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Change Password</h2>
            <form onSubmit={HandleSubmit}>
              <div className="mb-2">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="current-password"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="current-password"
                  name="OldPassword"
                  value={logdata.OldPassword || ""}
                  onChange={HandleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              {formErrors.OldPassword && (
                <span className="text-red-500 text-sm mb-1">
                  {formErrors.OldPassword}
                </span>
              )}

              <div className="mb-2">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="new-password"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  name="NewPassword"
                  value={logdata.NewPassword || ""}
                  onChange={HandleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              {formErrors.NewPassword && (
                <span className="text-red-500 text-sm mb-1">
                  {formErrors.NewPassword}
                </span>
              )}

              <div className="mb-2">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="confirm-password"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  name="ConfirmNewPassword"
                  value={logdata.ConfirmNewPassword || ""}
                  onChange={HandleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              {formErrors.ConfirmNewPassword && (
                <span className="text-red-500 text-sm mb-1">
                  {formErrors.ConfirmNewPassword}
                </span>
              )}

              <Button
                style="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                text={isLoading ? "Password changing..." : "Change Password"}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordChangeForm;
