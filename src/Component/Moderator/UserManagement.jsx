import React, { useState, useEffect } from "react";
import ModeratorNav from "./ModeratorNav";
import { useNavigate } from "react-router-dom";
import GetAuthToken from "../Layout/GetAuthToken";
import { useGetAllBookVaccinationQuery } from "../../Service/BookVaccinationApi";

const UserManagement = () => {
  const navigate = useNavigate();
  const token = GetAuthToken();
  const { data, error, isLoading, isError } = useGetAllBookVaccinationQuery();
  console.log(data?.data?.$values);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [!token]);

  return (
    <div className="flex h-screen">
      <div>
        <ModeratorNav />
      </div>

      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Managing User Vaccination</h2>

        <table className="table-auto w-full bg-white shadow-lg rounded ">
          <thead>
            <tr className="bg-gray-300">
              <th className="p-3">Patient Name</th>
              <th className="p-3">DOB</th>
              <th className="p-3">Patient Address</th>
              <th className="p-3">Vaccine Name</th>
              <th className="p-3">Dose</th>
              <th className="p-3">Serve Date</th>
              <th className="p-3">Location</th>
              <th className="p-3">Age Group</th>
              <th className="p-3">Status</th>
              <th className="p-3">Token</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.data?.$values.map((value) => (
                <tr key={value?.bookingId}>
                  <td className="text-center py-3">{value?.patientName}</td>
                  <td className="text-center py-3">{value?.dob}</td>
                  <td className="text-center py-3">{value?.address}</td>
                  <td className="text-center py-3">{value?.vaccinationName}</td>
                  <td className="text-center py-3">
                    {" "}
                    {value?.vaccinationDose}
                  </td>
                  <td className="text-center py-3"> {value?.serveDate}</td>
                  <td className="text-center py-3"> {value?.location}</td>
                  <td className="text-center py-3"> {value?.ageGroup}</td>
                  <td className="text-center py-3">
                    {" "}
                    {value?.vaccinationStatus}
                  </td>
                  <td className="text-center py-3"> {value?.token}</td>
                  <td>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
