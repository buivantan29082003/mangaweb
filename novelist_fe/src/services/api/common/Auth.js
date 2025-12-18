import axios from "axios";
import commonApi from "../../../config/api/CommonApi"

export const signIn=(dataLogin)=>{
    return commonApi.post("/login",dataLogin).then(v=>{
        return v.data.data;
    })
} 

export const refreshToken = async () => {
  const token = localStorage.getItem("access_token");
  const expireTime = localStorage.getItem("access_token_expire");
 
  if (!token || !expireTime || new Date() > new Date(expireTime)) {
    console.log("Token không hợp lệ hoặc đã hết hạn");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("access_token_expire");
    window.location.href = "/login"; // hoặc throw error
    return null;
  } 
  try {
    const response = await commonApi.post(
      "/refresh",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data.data; 
    localStorage.setItem("access_token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    const ttlMinutes = 60; // hoặc lấy từ config JWT
    const newExpireTime = new Date(new Date().getTime() + (ttlMinutes - 5) * 60 * 1000);
    localStorage.setItem("access_token_expire", newExpireTime.toISOString());

    return data;
  } catch (err) {
    console.error("Refresh token thất bại", err);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("access_token_expire");
    window.location.href = "/login";
    return null;
  }
};

