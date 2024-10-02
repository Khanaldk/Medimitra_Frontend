import React, { useEffect } from "react";
import toast from "react-hot-toast";
import UserNavbar from "./UserNav";
import { useNavigate } from "react-router-dom";
import VaccinationRecords from "./UserVaccinationRecord";
import GetAuthToken from "../Layout/GetAuthToken";

const User = () => {
  const navigate = useNavigate();
  const token = GetAuthToken();
  const username = localStorage.getItem("username") || "User";

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [!token]);

  return (
    <>
      <div className="flex h-screen justify-between">
        <div className="">
          <UserNavbar />
        </div>
        <div className="w-full px-2">
          <div className="w-3/4 p-8">
            <h1 className="text-3xl font-bold mb-6">Welcome, {username}</h1>
          </div>

          <h2 className="font-semibold mb-4 text-2xl">Vaccination Record</h2>
          <VaccinationRecords />
        </div>
      </div>
    </>
  );
};

export default User;
