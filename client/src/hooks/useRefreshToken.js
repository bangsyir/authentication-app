import axios from "../api/axios";
import useAuth from "./useAuth";
import jwt_decode from "jwt-decode";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    const decode = jwt_decode(response?.data?.accessToken);
    setAuth((prev) => {
      return {
        ...prev,
        user: { name: decode.name },
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};
export default useRefreshToken;
