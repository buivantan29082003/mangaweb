import axios from "axios";
import { refreshToken } from "../../services/api/common/Auth";

const userApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/user",  
  timeout: 10000,                        
  headers: {
    "Content-Type": "application/json", 
  },
});

userApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

userApi.interceptors.response.use(
  (response) => response,
  async (error) => { 
    const { response, config } = error; 
    if (
      response?.status === 401  
    ) { 

      config._retry = true;
     
      try {
       const newToken = await refreshToken(); 
        // Cập nhật token
        localStorage.setItem("access_token", newToken);
        config.headers.Authorization = `Bearer ${newToken}`;

        // Retry request và **trả về kết quả** cho interceptor
        return userApi(config);
        
      } catch (e) { 
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    } 
    return Promise.reject(error);
  }
);


export default userApi;
