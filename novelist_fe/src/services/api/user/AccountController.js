import userApi from "../../../config/api/userApi"

export const getAccount=async()=>{
    return userApi.get("/account/myaccount").then(v=>{
        return v.data.data
    })
}