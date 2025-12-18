import commonApi from "../../../config/api/CommonApi"

export const updateImage=async(file)=>{
    let formData=new FormData();
    formData.append("files",file,);
        return await commonApi.post("/upload",formData,{
        headers:{
            'Content-Type': 'multipart/form-data' 
        }
    }).then(v=>{
            return v.data.data
    }) 
}