import React from "react";
import { useNavigate } from "react-router-dom";
import { items } from "../Layout/data/ServiceData";

const IconCard = ({ item }) => {
  const navigate = useNavigate();
  const IconComponent = item.icon;

  const handleClick = () => {
    navigate(item.path);
  };

  return (
    <div className="flex flex-col items-center bg-white p-5 border border-gray-200 rounded-lg shadow-lg p">
      <IconComponent size="3em" className="text-red-600" />

      <p className="mt-3 text-lg font-bold text-red-600">{item.label}</p>

      <p className="text-sm text-gray-600">{item.head}</p>

      <button
        onClick={handleClick} // Add onClick event to handle navigation
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        {item.buttonText}
      </button>
    </div>
  );
};

const Service = () => {
  return (
    <>
      <div className="text-center">
        <h2 className="font-bold text-3xl mt-8 "> Our Services</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 px-10 mt-10 ">
        {items.map((item) => (
          <IconCard key={item.type} item={item} />
        ))}
      </div>
    </>
  );
};

export default Service;
