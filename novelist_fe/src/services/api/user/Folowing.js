import userApi from "../../../config/api/userApi"

export const follow=async (workId)=>{
    return await userApi.post("/following/follow/"+workId);
}

export const unFollow=async(workId)=>{
    return await userApi.post("/following/unfollow/"+workId);
}

export const getFollowing=async(query,currentPage)=>{
    return await userApi.get("/followings?currentPage="+currentPage+`${query.length>0?"&query="+query:""}`).then(v=>{
        return v.data.data
    })
}