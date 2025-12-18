import commonApi from "../../../config/api/CommonApi"

export const getAllStatus=async()=>{
    return await commonApi.get("/status").then(v=>{
        return v.data.data
    })
}
 