import axios, { AxiosRequestConfig } from "axios";
import tokenService from "./token.service";
import TokenService from "./token.service";
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = TokenService.getLocalAccessToken();
    if (token) { 
      if (config.headers === undefined) {
        config.headers = {};
      }
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/login" && err.response && err.response.data && typeof err.response.data.message === "string" && err.response.data.message.toLowerCase().indexOf("token expired") > -1) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await instance.post("/refresh-token", {}, { headers: { 'x-refresh': TokenService.getLocalRefreshToken() } });
          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken);
          return instance(originalConfig);
        } catch (_error) {
          if(err.response.status === 401) {
            tokenService.removeUser();
            window.location.href = "/login";
          }
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default instance;