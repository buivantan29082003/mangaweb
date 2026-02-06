import commonApi from "../../config/api/CommonApi"

export const getUserInfo=()=>{
    try {
        commonApi.get("/user").then(e=>{
            return e.data.data
        })
    } catch (error) {
        
    }
}