import adminApi from "../../../config/api/adminApi";

export const getAllWork=async(filters)=>{
    return await adminApi.get("/works").then(v=>{
        return v.data.data;
    })
}
 
export const getWorkById=async(id)=>{
    return await adminApi.get("/work/"+id).then(v=>{
        return v.data.data.data;
    })
}

export const created=async (work)=>{
    return await adminApi.post("/work/create",work);
}

export const getLatesChapter=async (workId)=>{
    return await adminApi.get("/work/newchapter/"+workId).then(v=>{
        return v.data.data;
    })
}

export const createdChapter=async (chapter)=>{ 
    return adminApi.post("/work/chapter/create",chapter)
}

export const report=async(workId)=>{
    return await adminApi.get("/work/traffic/"+workId).then(v=>{
        return v.data.data
    })
}