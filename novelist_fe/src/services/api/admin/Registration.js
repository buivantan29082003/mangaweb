import adminApi from "../../../config/api/adminApi"

export const getAllRegistration=async(filters)=>{
    return await adminApi.get(`/registration/getall?${filters.query.trim().length>0?"query="+filters.query:""}&${filters.planId!=-1?"planId="+filters.planId:""}
    &currentPage=${filters.currentPage}&${filters.startDate!=null?"startDate="+filters.startDate:""}&${filters.endDate!=null?"endDate="+filters.endDate:""}&${filters.status!=-1?"status="+filters.status:""}`).then(v=>{
        return v.data.data
    })
}