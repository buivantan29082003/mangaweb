import commonApi from "../../../config/api/CommonApi"

export const getAllPlan=async ()=>{
    return await commonApi.get("/plans").then(v=>v.data.data)
}