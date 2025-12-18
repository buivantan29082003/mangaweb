import userApi from "../../../config/api/userApi"

export const getAllWork=async(filters)=>{
    return await userApi.get("/works").then(v=>{
        return v.data.data;
    })
}
 
export const getWorkById=async(id)=>{
    return await userApi.get("/work/"+id).then(v=>{
        return v.data.data.data;
    })
}
 