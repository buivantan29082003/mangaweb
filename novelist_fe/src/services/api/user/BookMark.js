import userApi from "../../../config/api/userApi"

export const getBookMark=async(query,currentPage)=>{
    return await userApi.get("/bookmark/chapter?currentPage="+currentPage+`${query.length>0?"&query="+query:""}`).then(v=>{
        return v.data.data
    })
}