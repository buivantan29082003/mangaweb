import adminApi from "../../../config/api/adminApi"

export const getChapterById=async (chapterId)=>{
    return await adminApi.get("/chapter/"+chapterId).then(v=>{
        return v.data.data
    })
}

export const updateChapter=async (chapter, chapterId)=>{
    return await adminApi.post("/chapter/update/"+chapterId,chapter)
}