import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../Layout/Button";
import UserNav from "./UserNav";
import { useNavigate } from "react-router-dom";
import GetAuthToken from "../Layout/GetAuthToken";
import { useGetAllVaccinationQuery } from "../../Service/VaccinationApi";

const VaccinationTable = () => {
  const navigate = useNavigate();
  const token = GetAuthToken();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [!token]);

  const { data, error, isLoading } = useGetAllVaccinationQuery();

  return (
    <div className="h-screen flex">
      <div>
        <UserNav />
      </div>

      <div className="p-6 w-full">
        <h2 className="text-2xl font-bold mb-4">Vaccination Records</h2>

        <form className="flex justify-end mb-4 space-x-2">
          <input
            type="text"
            placeholder="Vaccination Name"
            className="border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Vaccination Type"
            className="border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </form>

        <table className="w-full bg-b border border-gray-200">
          <thead>
            <tr className="bg-gray-300">
              <th className="p-3">Vaccine Name</th>
              <th className="p-3">Vaccine Type</th>
              <th className="p-3">Dose</th>
              <th className="p-3">Serve Date</th>
              <th className="p-3">Location</th>
              <th className="p-3">Age Group</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? <div>Loading...</div> : ""}
            {data &&
              data?.data?.$values.map((value) => (
                <tr key={value?.vaccinationId}>
                  <td className="text-center p-3">{value?.vaccinationName}</td>
                  <td className="text-center p-3">{value?.vaccinationType}</td>
                  <td className="text-center p-3">{value?.vaccinationDose}</td>
                  <td className="text-center p-3">{value?.serveDate}</td>
                  <td className="text-center p-3">{value?.location}</td>
                  <td className="text-center p-3">{value?.ageGroup}</td>
                  <td className="text-center p-3">{value?.status}</td>
                  <td className="text-center p-3">
                    <Link
                      to={`/appointment/${value.vaccinationId}`}
                      className=" mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Book vaccination
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VaccinationTable;
