import userApi from "../../../config/api/userApi"

export const getCommentByWorkId=async (workId,currentPage)=>{
    return await userApi.get(`/comments/${workId}?currentPage=${currentPage}`).then(v=>{
        return v.data.data;
    })
}

export const getCommentByCommentId=async(commentId,currentPage)=>{
    return await userApi.get(`comments/child/${commentId}?currentPage=${currentPage}`).then(v=>{
        return v.data.data
    })
}

export const addComment=async (comment)=>{
    return await userApi.post("/comments/add",comment).then(v=>{
        return v.data.data
    }).catch(error=>{
        console.log(error)
    })
}

