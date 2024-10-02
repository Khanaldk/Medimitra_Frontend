import React from "react";
import Button from "../Layout/Button";
import { useGetAllUserBookVaccinationQuery } from "../../Service/BookVaccinationApi";

const VaccinationRecords = () => {
  const { data, error, isLoading } = useGetAllUserBookVaccinationQuery();
  console.log(data?.data?.$values);
  console.log(error);
  return (
    <div className="overflow-x-auto">
      <table className=" w-full bg-white shadow-lg rounded">
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
                <td className="text-center py-3">
                  {value?.vaccination?.vaccinationName}
                </td>
                <td className="text-center py-3">
                  {" "}
                  {value?.vaccination?.vaccinationDose}
                </td>
                <td className="text-center py-3">
                  {" "}
                  {value?.vaccination?.serveDate}
                </td>
                <td className="text-center py-3">
                  {" "}
                  {value?.vaccination?.location}
                </td>
                <td className="text-center py-3">
                  {" "}
                  {value?.vaccination?.ageGroup}
                </td>
                <td className="text-center py-3"> {value?.status}</td>
                <td className="text-center py-3"> {value?.token}</td>
                <td>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default VaccinationRecords;
