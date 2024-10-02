import React, { useState, useEffect } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSignupMutation } from "../../Service/authApi";
import Navbar from "./Navbar";
import toast from "react-hot-toast";

function Signup() {
  const backgroundImage =
    "https://www.cancer.gov/sites/g/files/xnrzdm211/files/styles/cgov_article/public/cgov_image/media_image/2023-04/syringe%20and%20bottle%20mrna%20vaccine.jpg?itok=8ubjgoVe";
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "80vh",
    width: "70%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });

  const [signupUser, { data, error, isError, isLoading, isSuccess }] =
    useSignupMutation();

  useEffect(() => {
    if (data) {
      toast.success("Registered Successfully.");
      navigate("/login");
    }

    if (error?.data?.message) {
      setFormErrors((prevErrors) => ({
        general: error?.data?.message,
      }));
    }

    if (error?.data?.errors?.Username) {
      setFormErrors((prevErrors) => ({
        Username: error?.data?.errors?.Username.join(", "),
      }));
    }

    if (error?.data?.errors?.ConfirmPassword) {
      setFormErrors((prevErrors) => ({
        ConfirmPassword: error?.data?.errors?.ConfirmPassword.join(", "),
      }));
    }
    if (error?.data?.errors?.Password) {
      setFormErrors((prevErrors) => ({
        Password: error?.data?.errors?.Password.join(", "),
      }));
    }
  }, [error, data]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser(formData);
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-4">
        {/* Container for form and image */}
        <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Left side: Signup Form */}
          <div className="w-1/2 p-8">
            <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
            <form onSubmit={HandleSubmit}>
              <div className="mb-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  name="Username"
                  value={formData.Username}
                  onChange={HandleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your Name"
                />
              </div>
              {formErrors.Username && (
                <span className="text-red-500 text-sm mt-1">
                  {formErrors.Username}
                </span>
              )}

              <div className="mb-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="Email"
                  required
                  value={formData.Email}
                  onChange={HandleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                />
              </div>

              {formErrors.general && (
                <span className="text-red-500 text-sm mt-1">
                  {formErrors.general}
                </span>
              )}

              <div className="mb-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="Password"
                  id="password"
                  required
                  value={formData.Password}
                  onChange={HandleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your password"
                />
              </div>

              {formErrors.Password && (
                <span className="text-red-500 text-sm mt-1">
                  {formErrors.Password}
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
                  name="ConfirmPassword"
                  id="confirmPassword"
                  required
                  value={formData.ConfirmPassword}
                  onChange={HandleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Confirm your password"
                />
              </div>
              {formErrors.ConfirmPassword && (
                <span className="text-red-500 text-sm mt-1">
                  {formErrors.ConfirmPassword}
                </span>
              )}

              <div className="items-center justify-between">
                <Button
                  disabled={isLoading}
                  style={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full 
                    ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  text={isLoading ? "Registering..." : "Signup"}
                />
              </div>
              <div className="mt-4 text-center">
                <Link
                  to="/login"
                  className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-700"
                >
                  Already have an account? Login
                </Link>
              </div>
            </form>
          </div>

          {/* Right side: Image */}
          <div
            className="w-1/2 bg-cover bg-center"
            style={backgroundStyle}
          ></div>
        </div>
      </div>
    </>
  );
}

export default Signup;
