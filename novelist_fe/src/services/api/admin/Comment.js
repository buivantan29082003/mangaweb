import adminApi from "../../../config/api/adminApi"

export const deleteComment=async (commentId)=>{
    return await adminApi.post("/comment/delete/"+commentId);
}