export const getDataError=(error)=>{
    if (error.response && error.response.data) {
      return error.response.data
    } else {
      return {
        data:"Có lỗi xảy ra."
      }
    }
}