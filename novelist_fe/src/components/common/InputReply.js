import { useState } from "react" 
import { addComment } from "../../services/api/user/Comment"

const InputReply=({setOpenReply, workId,parentId, pushItem})=>{
     
    const [comment,setComment]=useState({
        parentId:parentId,
        workId:workId,
        content:""
    })

    const addCommentView=()=>{
        addComment(comment).then(v=>{
            comment.content=""
            pushItem(v)
        })
    }

    return <>
        <textarea onChange={e=>{ 
            setComment({...comment,content:e.target.value})
        }} value={comment.content} className="bg-gray-700 border-gray-500 mt-2 mb-2 w-full outline-none text-sm p-3 "/>
        <div className="flex gap-2">
            <button onClick={addCommentView} className="text-sm py-1 rounded-sm px-2 bg-orange-600 text-white">Trả lời</button>
            <button onClick={setOpenReply.bind(null,false)} className="text-sm py-1 rounded-sm px-2 bg-gray-700 text-white">Hủy</button>
        </div>
    </>

}

export default InputReply