import { jwtDecode } from "jwt-decode";

export const isTokenExpired = async (token) => {
  console.log("token");
  console.log(token);
  if (!token) return true;
  console.log("token");
  console.log(token);
  try {
    const decodedToken = jwtDecode(token);
    console.log("decodedToken:", decodedToken);

    const exp = decodedToken.exp;
    const currentTime = Math.floor(Date.now() / 1000);

    console.log("decodedToken.exp:", exp);
    console.log("currentTime:", currentTime);

    return exp < currentTime;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return true;
  }
};
