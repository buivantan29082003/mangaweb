import React, { useState } from "react";
import { refreshToken, signIn } from "../services/api/common/Auth";
import {getDataError} from "../services/api/common/ErrorData"
export default function Login() {
    
    const [dataLogin, SetDataLogin]=useState({
        email:"",
        password:""
    })

    const login=()=>{
        signIn(dataLogin).then(v=>{  
            localStorage.setItem("access_token",v.token)
            localStorage.setItem("user",JSON.stringify(v.user))
            const ttlMinutes = 60;

            // Tính thời điểm hết hạn
            const now = new Date();
            const expireTime = new Date(now.getTime() + (ttlMinutes - 5) * 60 * 1000); // trừ 5 phút

            // Lưu thời điểm hết hạn vào localStorage
            localStorage.setItem("access_token_expire", expireTime.toISOString());
            alert("Đăng nhập thành công")
        }).catch(error=>{
            alert(getDataError(error).data)
        })
    }


    const changeInput=(e)=>{
        SetDataLogin({...dataLogin,[e.target.name]:e.target.value })
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className=" w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            {/* Simple SVG logo */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="11" fill="#F97316" />
              <path
                d="M9 7v10M9 7h6a3 3 0 010 6H9"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <button onClick={()=>{
             refreshToken();
          }}>Refreshh</button>
          <h1 className="text-2xl font-bold">
            <span className="text-black">TMusic</span>
            <span className="text-indigo-600">Streaming</span>
          </h1>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-left text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                onChange={changeInput}
                name="email"
                type="email"
                placeholder="Nhập email"
                className="w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M4 6h16v12H4z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M4 6l8 6 8-6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-left text-gray-700 mb-1">
              Mật khẩu
            </label>
            <div className="relative">
              <input
              onChange={changeInput}
                name="password"
                type="password"
                placeholder="Nhập mật khẩu"
                className="w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M6 10h12v10H6z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 10V7a4 4 0 018 0v3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* <div className="flex items-center justify-between text-sm">
             
            <a href="#" className="text-indigo-600 hover:underline">
              Quên mật khẩu?
            </a>
          </div> */}

          <button
            onClick={login}
            type="button"
            className="w-full mt-2 bg-sky-500 hover:bg-sky-600 text-white font-medium py-2.5 rounded-lg transition"
          >
            Đăng nhập
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Chưa có tài khoản?{" "}
          <a href="#" className="text-indigo-600 font-medium hover:underline">
            Đăng ký
          </a>
        </p>
      </div>

      {/* Footer note */}
      <p className="absolute bottom-6 text-xs text-gray-300 text-center px-4">
        Đôi khi, Server sẽ phản hồi chậm (do chính sách từ Render), hãy chờ và thử
        reload trang nếu gặp lỗi nhé
        <br />
        ©2025 TMusicStreaming. Bản quyền thuộc về Công ty TMusic.
      </p>
    </div>
  );
}
