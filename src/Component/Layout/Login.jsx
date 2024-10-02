import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useLoginMutation } from "../../Service/authApi";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [logdata, setData] = useState({ Email: "", Password: "" });
  const [loginData, { data, error, isLoading }] = useLoginMutation();

  useEffect(() => {
    if (error?.data?.type == "EmailPassword") {
      setFormErrors((prevErrors) => ({
        Password: error?.data?.message,
      }));
    }

    if (data) {
      localStorage.setItem("token", data?.data?.token);
      localStorage.setItem("username", data?.data?.userName);
      localStorage.setItem("role", data?.data?.role);
      if (data?.data?.role == "User") {
        toast.success("Login successfully.");
        navigate("/User");
      } else if (data?.data?.role == "Moderator") {
        toast.success("Login successfully.");
        navigate("/moderatorDashboard");
      } else if (data?.data?.role == "Admin") {
        toast.success("Login successfully.");
        navigate("/adminDashboard");
      } else {
        toast.error("Unauthorized User");
        navigate("/unauthorized User!");
      }
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
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center ">
        <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="w-1/2 p-8">
            <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
            <form onSubmit={HandleSubmit}>
              <div className="mb-4">
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
                  value={logdata.Email}
                  onChange={HandleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                />
              </div>
              {formErrors.Email && (
                <span className="text-red-500 text-sm mt-1">
                  {formErrors.Email}
                </span>
              )}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="Password"
                  required
                  value={logdata.Password}
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
              <div className="items-center justify-between">
                <Button
                  disabled={isLoading}
                  style={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full 
                    ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  text={isLoading ? "Logging in..." : "Login"}
                />
              </div>
              <div className="mt-4 text-center">
                <Link
                  to="/forgetPassword"
                  className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-700"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="text-center mt-2">
                <span className="inline-block align-baseline font-bold text-sm text-gray-700">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-red-500 hover:text-red-700"
                  >
                    Signup
                  </Link>
                </span>
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
    </>
  );
}

export default Login;
