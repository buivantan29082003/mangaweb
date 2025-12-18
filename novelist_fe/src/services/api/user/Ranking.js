import userApi from "../../../config/api/userApi"

export const getTopTenView=async ()=>{
    return await userApi.get("ranking/topten").then(v=>{
        return v.data.data
    })
}

export const getTopThreeView=async ()=>{
    return await userApi.get("ranking/topthree").then(v=>{
        return v.data.data
    })
}