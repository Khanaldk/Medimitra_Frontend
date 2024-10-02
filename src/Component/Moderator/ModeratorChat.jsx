import React, { useEffect } from "react";
import ModeratorNav from "./ModeratorNav";
import GetAuthToken from "../Layout/GetAuthToken";
import { useNavigate } from "react-router-dom";

const chat = () => {
  const navigate = useNavigate();
  const token = GetAuthToken();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [!token]);
  return (
    <div className="flex">
      <div>
        <ModeratorNav />
      </div>
      <div>
        <h2>Chat</h2>
      </div>
    </div>
  );
};

export default chat;
