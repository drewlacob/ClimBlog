import axios from "axios";

const apiUrl = `http://localhost:3000`;
const axiosClient = axios.create({
  baseURL: apiUrl, //TODO: use .env here?
  withCredentials: true,
});

axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    const allowedOrigins = apiUrl;
    const token = localStorage.getItem("token");
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosClient };
