import React, { useState, useEffect } from "react";
import ModeratorNav from "./ModeratorNav";
import { useNavigate } from "react-router-dom";
import {
  useCreateVaccinationMutation,
  useGetAllVaccinationQuery,
} from "../../Service/VaccinationApi";
import GetAuthToken from "../Layout/GetAuthToken";
import toast from "react-hot-toast";

const ModeratorDashboard = () => {
  const navigate = useNavigate();
  const token = GetAuthToken();

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    VaccinationName: "",
    VaccinationType: "",
    Location: "",
    VaccinationDose: 0,
    AgeGroup: "",
    ServeDate: "",
  });

  const { data, error, isLoading } = useGetAllVaccinationQuery();
  console.log(data);

  const [createNewVaccination, responseInfo] = useCreateVaccinationMutation();

  useEffect(() => {
    if (responseInfo?.data) {
      setFormErrors({});
      setFormData({});
      toast.success("New Vaccination Added Successfully");
      navigate("/moderatordashboard");
    }
    if (!token) {
      navigate("/login");
    }

    if (responseInfo?.error?.data?.errors?.VaccinationName) {
      setFormErrors((prevErrors) => ({
        VaccinationName:
          responseInfo?.error?.data?.errors?.VaccinationName.join(", "),
      }));
    }
    if (responseInfo?.error?.data?.errors?.VaccinationType) {
      setFormErrors((prevErrors) => ({
        VaccinationType:
          responseInfo?.error?.data?.errors?.VaccinationType.join(", "),
      }));
    }

    if (responseInfo?.error?.data?.errors?.VaccinationDose) {
      setFormErrors((prevErrors) => ({
        VaccinationDose:
          responseInfo?.error?.data?.errors?.VaccinationDose.join(", "),
      }));
    }
    if (responseInfo?.error?.data?.errors?.Location) {
      setFormErrors((prevErrors) => ({
        Location: responseInfo?.error?.data?.errors?.Location.join(", "),
      }));
    }

    if (responseInfo?.error?.data?.errors?.AgeGroup) {
      setFormErrors((prevErrors) => ({
        AgeGroup: responseInfo?.error?.data?.errors?.AgeGroup.join(", "),
      }));
    }
  }, [responseInfo?.data, responseInfo?.error, !token]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNewVaccination(formData);
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
    <div className="flex max-h-screen">
      <ModeratorNav />

      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Vaccination</h2>

        <form className="mb-8" onSubmit={HandleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 ">
            <div className="mb-2">
              <label htmlFor="Vaccine Name">Vaccine Name</label>
              <br />
              <input
                type="text"
                required
                name="VaccinationName"
                value={formData.VaccinationName || ""}
                onChange={HandleChange}
                placeholder="Enter the Vaccine Name"
                className="px-20 py-2 border border-gray-300 rounded"
              />
              <br />
              {formErrors.VaccinationName ? (
                <span className="text-red-500 text-sm mt-1">
                  {formErrors.VaccinationName}
                </span>
              ) : (
                ""
              )}
            </div>

            <div className="mb-2">
              <label htmlFor="Vaccine Type">Vaccine Type</label>
              <br />
              <input
                type="text"
                name="VaccinationType"
                value={formData.VaccinationType || ""}
                onChange={HandleChange}
                placeholder="Enter the Vaccine Type"
                className="px-20 py-2 border border-gray-300 rounded"
                required
              />
              <br />
              {formErrors.VaccinationType && (
                <span className="text-red-500 text-sm mt-1">
                  {formErrors.VaccinationType}
                </span>
              )}
            </div>

            <div className="mb-2">
              <label htmlFor="Vaccine Dose">Vaccine Dose</label>
              <br />
              <input
                type="number"
                name="VaccinationDose"
                value={formData.VaccinationDose || ""}
                onChange={HandleChange}
                placeholder="Enter the Vaccine Dose"
                className="px-20 py-2 border border-gray-300 rounded"
                required
              />
              <br />
              {formErrors.VaccinationDose && (
                <span className="text-red-500 text-sm mt-1">
                  {formErrors.VaccinationDose}
                </span>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="Vaccine Location">Location</label>
              <br />
              <input
                type="text"
                name="Location"
                value={formData.Location || ""}
                onChange={HandleChange}
                placeholder="Enter the Location"
                className="px-20 py-2 border border-gray-300 rounded"
                required
              />
              <br />
              {formErrors.Location && (
                <span className="text-red-500 text-sm mt-1">
                  {formErrors.Location}
                </span>
              )}
            </div>

            <div className="mb-2">
              <label htmlFor="Vaccine Age Group">Age Group</label>
              <br />
              <input
                type="text"
                name="AgeGroup"
                value={formData.AgeGroup || ""}
                onChange={HandleChange}
                placeholder="Enter the Age Group"
                className="px-20 py-2 border border-gray-300 rounded"
                required
              />
              <br />
              {formErrors.AgeGroup ? (
                <span className="text-red-500 text-sm mt-1">
                  {formErrors.AgeGroup}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="Serve Date">Serve Date</label>
              <br />
              <input
                type="date"
                name="ServeDate"
                value={formData.ServeDate || ""}
                onChange={HandleChange}
                placeholder="Enter the Serve Date"
                className="px-20 py-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <button
            disabled={responseInfo?.isLoading}
            className={`mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700  ${
              responseInfo?.isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {responseInfo?.isLoading ? "Adding Vaccine..." : "Add Vaccination"}
          </button>
        </form>

        <h3 className="text-xl font-bold mb-2 mt-4">Vaccination Programs</h3>
        {/* Search Form */}
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

        {/* Vaccination Programs Table */}

        <table className="table-auto w-full bg-white shadow-lg rounded">
          <thead>
            <tr className="bg-gray-300">
              <th className="p-3">S.N</th>
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
            {isLoading ? <div className="text-center">Loading...</div> : ""}
            {data &&
              data?.data?.$values.map((value) => (
                <tr key={value?.vaccinationId}>
                  <td className="text-center">{value?.vaccinationId}</td>
                  <td className="text-center">{value?.vaccinationName}</td>
                  <td className="text-center">{value?.vaccinationType}</td>
                  <td className="text-center">{value?.vaccinationDose}</td>
                  <td className="text-center">{value?.serveDate}</td>
                  <td className="text-center">{value?.location}</td>
                  <td className="text-center">{value?.ageGroup}</td>
                  <td className="text-center">{value?.status}</td>
                  <td className="text-center">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">
                      Edit
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

export default ModeratorDashboard;
