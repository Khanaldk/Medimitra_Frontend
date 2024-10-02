import React, { useState, useEffect } from "react";
import Button from "./Button";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useResetpasswordMutation } from "../../Service/authApi";
import toast from "react-hot-toast";

function ResetPassword() {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [logdata, setData] = useState({
    Otp: null,
    newPassword: "",
    confirmPassword: "",
  });
  const [loginData, { data, error, isLoading }] = useResetpasswordMutation();

  useEffect(() => {
    if (error?.data?.type == "Session_TimeOut") {
      navigate("/forgotpassword");
    }

    if (error?.data?.type == "Otp") {
      setFormErrors((prevErrors) => ({
        Otp: error?.data?.message,
      }));
    }
    if (error?.data?.errors?.confirmPassword) {
      setFormErrors((prevErrors) => ({
        confirmPassword: error?.data?.errors?.confirmPassword.join(", "),
      }));
    }
    if (error?.data?.errors?.newPassword) {
      setFormErrors((prevErrors) => ({
        newPassword: error?.data?.errors?.newPassword.join(", "),
      }));
    }

    if (data) {
      toast.success("Password reset successfully.");
      navigate("/login");
    }
  }, [error, data]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
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
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="w-1/2 p-8">
            <h2 className="text-3xl font-bold text-center mb-6">
              Reset Password
            </h2>
            <form onSubmit={HandleSubmit}>
              <div className="mb-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="newPassword"
                >
                  OTP
                </label>
                <input
                  type="number"
                  id="otp"
                  name="Otp"
                  value={logdata.Otp}
                  onChange={HandleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your OTP"
                />
              </div>
              {formErrors.Otp && (
                <span className="text-red-500 text-sm">{formErrors.Otp}</span>
              )}
              <div className="mb-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="newPassword"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={logdata.newPassword}
                  onChange={HandleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter new password"
                />
              </div>
              {formErrors.newPassword && (
                <span className="text-red-500 text-sm">
                  {formErrors.newPassword}
                </span>
              )}
              <div className="mb-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={logdata.confirmPassword}
                  onChange={HandleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Confirm your password"
                />
              </div>
              {formErrors.confirmPassword && (
                <span className="text-red-500 text-sm ">
                  {formErrors.confirmPassword}
                </span>
              )}
              <Button
                style="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                text={isLoading ? "Resetting password..." : "Reset Password"}
              />
            </form>
          </div>

          {/* Right side: Image */}
          <div
            className="w-1/2 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://www.cancer.gov/sites/g/files/xnrzdm211/files/styles/cgov_article/public/cgov_image/media_image/2023-04/syringe%20and%20bottle%20mrna%20vaccine.jpg?itok=8ubjgoVe")',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
