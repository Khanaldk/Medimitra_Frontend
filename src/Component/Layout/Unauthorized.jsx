import React from "react";

const Unauthorized = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-500">Unauthorized Access</h1>
        <p className="mt-4 text-gray-600">
          You do not have permission to access this page.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
