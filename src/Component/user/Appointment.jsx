import React, { useEffect, useState } from "react";
import UserNav from "./UserNav";
import { useNavigate, useParams } from "react-router-dom";
import { useGetVaccinationByIdQuery } from "../../Service/VaccinationApi";
import { useCreateBookVaccinationMutation } from "../../Service/BookVaccinationApi";
import GetAuthToken from "../Layout/GetAuthToken";
import toast from "react-hot-toast";

const AppointmentForm = () => {
  const vaccinationId = useParams();
  const navigate = useNavigate();
  const token = GetAuthToken();

  const { data, error, isError, isLoading } = useGetVaccinationByIdQuery(
    vaccinationId.vaccinationId
  );

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    PatientName: "",
    DOB: "",
    BookingDate: `${data?.data?.serveDate}`,
    Address: "",
    VaccinationId: `${parseInt(data?.data?.vaccinationId)}`,
  });
  const [createBookVaccination, responseInfo] =
    useCreateBookVaccinationMutation();

  useEffect(() => {
    if (responseInfo?.data?.data) {
      toast.success("Vaccination Booked Successfully.");
      setFormErrors({});
      setFormData({});

      navigate("/user");
    }
    if (error?.data?.type == "VaccinationIdNotFound") {
      navigate("/vaccinationDetails");
    }

    if (responseInfo?.error?.data?.type == "VaccineAlreadyBooked") {
      toast.error(responseInfo?.error?.data?.message);
    }
    if (!token) {
      navigate("/login");
    }

    if (responseInfo?.error?.data?.errors?.PatientName) {
      setFormErrors((prevErrors) => ({
        PatientName: responseInfo?.error?.data?.errors?.PatientName.join(", "),
      }));
    }
    if (responseInfo?.error?.data?.errors?.DOB) {
      setFormErrors((prevErrors) => ({
        DOB: responseInfo?.error?.data?.errors?.DOB.join(", "),
      }));
    }

    if (responseInfo?.error?.data?.errors?.Address) {
      setFormErrors((prevErrors) => ({
        Address: responseInfo?.error?.data?.errors?.Address.join(", "),
      }));
    }
  }, [error, !token, responseInfo?.data, responseInfo?.error]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBookVaccination(formData);
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
    <div className="flex h-screen">
      <div className="w-1/4 h-screen">
        <UserNav />
      </div>

      <div className="w-3/4 p-8 bg-gray-100 flex justify-center">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
          <div className="flex justify-between">
            <div className="w-1/2 px-4">
              <h2 className="text-2xl font-bold mb-3">Patient Details</h2>

              <form onSubmit={HandleSubmit}>
                <div className="mb-2">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="childName"
                  >
                    Patient Name
                  </label>
                  <input
                    type="text"
                    id="PatientName"
                    required
                    name="PatientName"
                    value={formData.PatientName || ""}
                    onChange={HandleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="Enter Patient name"
                  />
                </div>
                {formErrors.PatientName ? (
                  <span className="text-red-500 text-sm mt-1">
                    {formErrors.PatientName}
                  </span>
                ) : (
                  ""
                )}

                <div className="mb-2">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="dob"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    required
                    name="DOB"
                    value={formData.DOB || ""}
                    onChange={HandleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                {formErrors.DOB ? (
                  <span className="text-red-500 text-sm mt-1">
                    {formErrors.DOB}
                  </span>
                ) : (
                  ""
                )}

                <div className="mb-2">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="bookingDate"
                  >
                    Booking Date
                  </label>
                  <input
                    type="date"
                    id="bookingDate"
                    name="BookingDate"
                    value={formData.BookingDate || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="mb-2">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    required
                    name="Address"
                    value={formData.Address || ""}
                    onChange={HandleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="Enter your address"
                  />
                  {formErrors.Address ? (
                    <span className="text-red-500 text-sm mt-1">
                      {formErrors.Address}
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <div>
                  <input
                    type="hidden"
                    id="vaccinationId"
                    name="VaccinationId"
                    value={parseInt(formData.VaccinationId || "")}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="Enter your vaccination Id"
                  />
                </div>
                <div className=" justify-end mt-2">
                  <button
                    disabled={responseInfo?.isLoading}
                    className={`mt-4 bg-red-500 text-white py-2 px-8 rounded hover:bg-red-700  ${
                      responseInfo?.isLoading
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {responseInfo?.isLoading
                      ? "Booking in Process..."
                      : "Create Appointment"}
                  </button>
                </div>
              </form>
            </div>

            <div className="w-1/2 mx-10 bg-gray-50 border-l">
              <h2 className="text-2xl font-bold mb-4">Vaccination Details</h2>

              {data && (
                <>
                  <p className="text-lg mb-4">
                    <strong>Vaccination Name :</strong>{" "}
                    {data?.data?.vaccinationName}
                  </p>

                  <p className="text-lg mb-4">
                    <strong>Vaccination Type :</strong>
                    {data?.data?.vaccinationType}
                  </p>

                  <p className="text-lg mb-4">
                    <strong>Serve Date :</strong> {data?.data?.serveDate}
                  </p>

                  <p className="text-lg mb-4">
                    <strong>Vaccination Dose :</strong>{" "}
                    {data?.data?.vaccinationDose}
                  </p>

                  <p className="text-lg mb-4">
                    <strong>Location :</strong> {data?.data?.location}
                  </p>

                  <p className="text-lg mb-4">
                    <strong>Age Group : </strong>
                    {data?.data?.ageGroup}
                  </p>

                  <p className="text-lg mb-4">
                    <strong>Status : </strong>
                    {data?.data?.status}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
