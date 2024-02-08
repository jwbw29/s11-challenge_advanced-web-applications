// ✨ implement axiosWithAuth
import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  const baseURL =
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:9000/api";

  return axios.create({
    baseURL,
    headers: {
      authorization: token,
    },
  });
};

export default axiosWithAuth;
