import React, { useState, useEffect } from "react";
import ModeratorNav from "./ModeratorNav";
import { useNavigate } from "react-router-dom";
import GetAuthToken from "../Layout/GetAuthToken";
import { usePeekNextBookingVaccinationQuery } from "../../Service/BookVaccinationApi";

const RecordManagement = () => {
  const navigate = useNavigate();
  const token = GetAuthToken();
  const { data, error, isLoading } = usePeekNextBookingVaccinationQuery();
  const [showPopup, setShowPopup] = useState(false);

  const handlePeekClick = () => {
    const userConfirmed = window.confirm(
      "Do you want to peek the next booking details?"
    );
    if (userConfirmed) {
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  console.log(data);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [!token]);

  return (
    <>
      <div className="flex">
        <div>
          {" "}
          <ModeratorNav />
        </div>
        <div className="w-full">
          <div className="flex flex-col min-h-screen p-6 bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Record Management</h2>

            <div className="mb-8 mt-3 flex justify-around space-x-2">
              <button
                className="px-14 py-3 text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={handlePeekClick}
              >
                {isLoading ? "Peeking.." : "Peek User"}
              </button>
              <button className="bg-green-500 text-white px-14 py-3 rounded hover:bg-green-700">
                Serve User
              </button>
              <button className="bg-red-500 text-white px-14 py-3 rounded hover:bg-red-700">
                Make Delay
              </button>
            </div>

            {data?.data && showPopup && (
              <>
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-8 rounded-lg shadow-lg w-[600px] h-auto">
                    {" "}
                    <h2 className="text-2xl font-bold mb-6 text-center">
                      Booking Details
                    </h2>{" "}
                    <div className="space-y-4">
                      {" "}
                      <p className="text-lg">
                        <strong>Patient Name:</strong> {data?.data?.patientName}
                      </p>
                      <p className="text-lg">
                        <strong>Date of Birth:</strong> {data?.data?.dob}
                      </p>
                      <p className="text-lg">
                        <strong>Patient Address:</strong> {data?.data?.address}
                      </p>
                      <p className="text-lg">
                        <strong>Booking Date:</strong> {data?.data?.bookingDate}
                      </p>
                      <p className="text-lg">
                        <strong>Vaccination Name:</strong>{" "}
                        {data?.data?.vaccination?.vaccinationName}
                      </p>
                      <p className="text-lg">
                        <strong>Vaccination Type:</strong>{" "}
                        {data?.data?.vaccination?.vaccinationType}
                      </p>
                      <p className="text-lg">
                        <strong>Vaccination Dose:</strong>{" "}
                        {data?.data?.vaccination?.vaccinationDose}
                      </p>
                      <p className="text-lg">
                        <strong>Vaccination Location:</strong>{" "}
                        {data?.data?.vaccination?.location}
                      </p>
                      <p className="text-lg">
                        <strong>Status:</strong> {data?.data?.status}
                      </p>
                      <p className="text-lg">
                        <strong>Token:</strong> {data?.data?.token}
                      </p>
                    </div>
                    <div className="flex justify-end mt-8 space-x-3">
                      <button
                        className="px-6 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                        onClick={closePopup}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                        onClick={closePopup}
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            <table className="table-auto w-full bg-white shadow-lg rounded">
              <thead>
                <tr className="bg-gray-300">
                  <th className="p-3">S.N</th>
                  <th className="p-3">Vaccination Name</th>
                  <th className="p-3">Vaccination Type</th>
                  <th className="p-3">Patient's Name</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3">vaccinationName</td>
                  <td className="p-3">vaccinationName</td>
                  <td className="p-3">vaccinationName</td>
                  <td className="p-3">vaccinationName</td>
                  <td className="p-3">vaccinationName</td>
                  <td className="p-3">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">
                      Update to Served
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordManagement;

// import React, { useState } from "react";
// import { usePeekNextBookingVaccinationQuery } from "../../Service/BookVaccinationApi";

// const PeekPopup = () => {
//   const { data, error, isFetching, isLoading } =
//     usePeekNextBookingVaccinationQuery();
//   console.log(data?.data);
//   const [showPopup, setShowPopup] = useState(false);

//   const handlePeekClick = () => {
//     setShowPopup(true);
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//   };

//   return (
//     <div className="flex bg-gray-100">
//       <button
//         className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
//         onClick={handlePeekClick}
//       >
//         Peek
//       </button>

//       {data?.data && showPopup && (
//         <>
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//             <div className="bg-white p-6 rounded shadow-lg w-80">
//               <h2 className="text-xl font-bold mb-4">Booking Details</h2>

//               <div className="space-y-2">
//                 <p>
//                   <strong>Booking ID:</strong> {data?.data?.bookingId}
//                 </p>
//                 <p>
//                   <strong>Patient Name:</strong> {data?.data?.patientName}
//                 </p>
//                 <p>
//                   <strong>Date of Birth:</strong> {data?.data?.dob}
//                 </p>
//                 <p>
//                   <strong>Address:</strong> {data?.data?.address}
//                 </p>

//                 <p>
//                   <strong>Booking Date:</strong> {data?.data?.bookingDate}
//                 </p>
//                 <p>
//                   <strong>Status:</strong> {data?.data?.status}
//                 </p>
//                 <p>
//                   <strong>Token:</strong> {data?.data?.token}
//                 </p>
//               </div>

//               <div className="flex justify-end mt-6 space-x-2">
//                 <button
//                   className="px-4 py-2 text-white bg-gray-400 rounded hover:bg-gray-500"
//                   onClick={closePopup}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
//                   onClick={closePopup}
//                 >
//                   OK
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default PeekPopup;
