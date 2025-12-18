const { default: commonApi } = require("../../../config/api/CommonApi")

const getAllGenre=async(filters)=>{
    return await commonApi.get("/genres").then(v=>{
        return v.data.data
    })
}

module.exports={getAllGenre}