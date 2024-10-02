import React, { useState, useEffect } from "react";
import ModeratorNav from "./ModeratorNav";
import { useNavigate } from "react-router-dom";
import GetAuthToken from "../Layout/GetAuthToken";

import {
  useGetAllDelayedUserQuery,
  useMarkedBookVaccinationAsDelayedMutation,
  useMarkedBookVaccinationAsServedMutation,
  usePeekNextBookingVaccinationQuery,
} from "../../Service/BookVaccinationApi";
import toast from "react-hot-toast";
import withSessionTimeout from "../Layout/withSessionTimeout ";

const RecordManagement = () => {
  const navigate = useNavigate();
  const token = GetAuthToken();
  const {
    data: peekedData,
    refetch,
    error,
    isLoading,
  } = usePeekNextBookingVaccinationQuery();

  const {
    data: DelayedData,
    error: delayError,
    isLoading: Loading,
  } = useGetAllDelayedUserQuery();
  console.log(DelayedData?.data?.$values);
  console.log(delayError);
  console.log(Loading);

  const [showPopup, setShowPopup] = useState(false);

  const [MarkedBookVaccinationAsServed, responseInfo] =
    useMarkedBookVaccinationAsServedMutation();

  const [MarkedBookVaccinationAsDelayed, responseInfoPart] =
    useMarkedBookVaccinationAsDelayedMutation();

  const handlePeekClick = () => {
    refetch();
    const userConfirmed = window.confirm(
      "Do you want to peek the next booking details?"
    );
    if (userConfirmed) {
      if (error?.data?.type == "EmptyQueue") {
        setShowPopup(false);
        toast.error(error?.data?.message);
      } else {
        setShowPopup(true);
      }
    }
  };

  const handleServeClick = async () => {
    const userConfirmed = window.confirm(`Do you want to serve user?`);
    if (userConfirmed) {
      try {
        await MarkedBookVaccinationAsServed();
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    }
  };

  const handleDelayClick = async () => {
    const userConfirmed = window.confirm(`Do you want to make user delay?`);
    if (userConfirmed) {
      try {
        await MarkedBookVaccinationAsDelayed();
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    if (responseInfo?.data?.data) {
      toast.success(`${peekedData?.data?.patientName} served successfully.`);
    }

    if (responseInfo?.error?.data?.type == "NoDataInQueueForServe") {
      toast.error(responseInfo?.error?.data?.message);
    }
  }, [!token, responseInfo?.data, responseInfo?.error]);

  useEffect(() => {
    if (responseInfoPart?.data?.data) {
      toast.success(`${peekedData?.data?.patientName} switch to delay.`);
    }
    if (responseInfoPart?.error?.data?.type == "DelayedError") {
      toast.error(responseInfoPart?.error?.data?.message);
    }
  }, [responseInfoPart?.data, responseInfoPart?.error]);

  return (
    <>
      <div className="flex">
        <div>
          <ModeratorNav />
        </div>
        <div className="w-full overflow-auto">
          <div className="flex flex-col h-screen p-6 bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Record Management</h2>

            <div className="mb-8 mt-3 flex justify-around space-x-2">
              <button
                className="px-14 py-3 text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={handlePeekClick}
              >
                {isLoading ? "Peeking.." : "Peek User"}
              </button>
              <button
                className="bg-green-500 text-white px-14 py-3 rounded hover:bg-green-700"
                onClick={handleServeClick}
              >
                Serve User
              </button>
              <button
                className="bg-red-500 text-white px-14 py-3 rounded hover:bg-red-700"
                onClick={handleDelayClick}
              >
                Make Delay
              </button>
            </div>

            {peekedData?.data && showPopup && (
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
                        <strong>Patient Name:</strong>{" "}
                        {peekedData?.data?.patientName}
                      </p>
                      <p className="text-lg">
                        <strong>Date of Birth:</strong> {peekedData?.data?.dob}
                      </p>
                      <p className="text-lg">
                        <strong>Patient Address:</strong>{" "}
                        {peekedData?.data?.address}
                      </p>
                      <p className="text-lg">
                        <strong>Booking Date:</strong>{" "}
                        {peekedData?.data?.bookingDate}
                      </p>
                      <p className="text-lg">
                        <strong>Vaccination Name:</strong>{" "}
                        {peekedData?.data?.vaccination?.vaccinationName}
                      </p>
                      <p className="text-lg">
                        <strong>Vaccination Type:</strong>{" "}
                        {peekedData?.data?.vaccination?.vaccinationType}
                      </p>
                      <p className="text-lg">
                        <strong>Vaccination Dose:</strong>{" "}
                        {peekedData?.data?.vaccination?.vaccinationDose}
                      </p>
                      <p className="text-lg">
                        <strong>Vaccination Location:</strong>{" "}
                        {peekedData?.data?.vaccination?.location}
                      </p>
                      <p className="text-lg">
                        <strong>Status:</strong> {peekedData?.data?.status}
                      </p>
                      <p className="text-lg">
                        <strong>Token:</strong> {peekedData?.data?.token}
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
                  <th className="p-3">Patient Name</th>
                  <th className="p-3">DOB</th>
                  <th className="p-3">Patient Address</th>
                  <th className="p-3">Vaccine Name</th>
                  <th className="p-3"> Dose</th>
                  <th className="p-3">Booked Date</th>
                  <th classDose="p-3">Token</th>
                  <th classDose="p-3">Status</th>

                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {DelayedData &&
                  DelayedData?.data?.$values.map((value) => (
                    <tr key={value?.bookingId}>
                      <td className="text-center py-3">{value?.patientName}</td>
                      <td className="text-center py-3">{value?.dob}</td>
                      <td className="text-center py-3">{value?.address}</td>
                      <td className="text-center py-3">
                        {value?.vaccinationName}
                      </td>
                      <td className="text-center py-3">
                        {" "}
                        {value?.vaccinationDose}
                      </td>
                      <td className="text-center py-3"> {value?.serveDate}</td>
                      <td className="text-center py-3"> {value?.token}</td>
                      <td className="text-center py-3">
                        {" "}
                        {value?.bookingStatus}
                      </td>
                      <td className="text-center py-3">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">
                          Update to serve
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default withSessionTimeout(RecordManagement);

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
