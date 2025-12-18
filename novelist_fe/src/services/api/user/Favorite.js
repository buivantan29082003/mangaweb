import userApi from "../../../config/api/userApi"

export const like= async(workId)=>{
    return await userApi.post("/favorite/like/"+workId)
}

export const unLike= async(workId)=>{
    return await userApi.post("/favorite/unlike/"+workId)
}