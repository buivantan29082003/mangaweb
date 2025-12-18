import adminApi from "../../../config/api/adminApi"

export const getAllAccount=async(filters)=>{
    return await adminApi.get(`/account/getall?${filters.query.trim().length>0?"query="+filters.query:""} 
    &currentPage=${filters.currentPage}&${filters.status!=-1?"status="+filters.status:""}`).then(v=>{
        return v.data.data
    })
}

export const changeStatus=async(status, accountId)=>{
    return await adminApi.post("/account/changestatus/"+accountId+"/"+status)
}