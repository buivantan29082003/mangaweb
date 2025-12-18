import commonApi from "../../../config/api/CommonApi"

export const getAllAuthors=async()=>{
    return await commonApi.get("/authors").then(v=>{
        return v.data.data
    })
}
 