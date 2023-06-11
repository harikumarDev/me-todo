import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use((configInfo) => {
  const config = configInfo;
  config.headers["Content-Type"] = "application/json";

  return config;
});

export default axios;
