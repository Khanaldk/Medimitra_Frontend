import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "./isTokenExpired ";
import GetAuthToken from "./GetAuthToken";

const withSessionTimeout = (WrappedComponent) => {
  return (props) => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const token = GetAuthToken();

      const checkTokenExpiration = async () => {
        console.log("token");
        console.log(token);
        if (await isTokenExpired(token)) {
          setMessage("Your session has expired. Redirecting to login...");
          setTimeout(() => {
            navigate("/login");
          }, 4000);
        }
      };

      // Set an interval to check every 30 seconds
      const interval = setInterval(async () => {
        await checkTokenExpiration();
      }, 30000); // Check every 30 seconds

      // Cleanup the interval on unmount
      return () => clearInterval(interval);
    }, [navigate]);

    return (
      <>
        {message ? (
          <div className="flex justify-center items-center mt-56">
            <h2>{message}</h2>
          </div>
        ) : (
          <WrappedComponent {...props} />
        )}
      </>
    );
  };
};

export default withSessionTimeout;
