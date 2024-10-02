import React, { useState, useEffect } from "react";
import Button from "./Button";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForgotpasswordMutation } from "../../Service/authApi";
import toast from "react-hot-toast";

function ForgetPassword() {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [logdata, setData] = useState({ Email: "" });
  const [loginData, { data, error, isLoading }] = useForgotpasswordMutation();

  useEffect(() => {
    if (error?.data?.type == "Email") {
      setFormErrors((prevErrors) => ({
        Email: error?.data?.message,
      }));
    }
    if (data) {
      toast.success("Otp sent successfully.");
      navigate("/resetpassword");
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
      <div>
        <Navbar />
      </div>
      <div className="min-h-screen flex items-center justify-center p-4 ">
        {/* Container for form and image */}
        <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Left side: Forget Password Form */}
          <div className="w-1/2 p-8 ">
            <h2 className="text-3xl font-bold text-center mb-6">
              Forgot Password
            </h2>
            <form onSubmit={HandleSubmit}>
              <div className="mb-3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-3"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="Email"
                  value={logdata.Email}
                  onChange={HandleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                />
              </div>
              {formErrors.Email && (
                <span className="text-red-500 text-sm mb-1">
                  {formErrors.Email}
                </span>
              )}

              <div className="items-center justify-between mt-4">
                <Button
                  disabled={isLoading}
                  style={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full 
                    ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  text={isLoading ? "Sending Otp..." : "Send Otp"}
                />
              </div>
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

export default ForgetPassword;
