// import * as React from "react";
import Box from "@mui/material/Box"; 
import {  createdChapter } from "../../services/api/admin/work";
import { getDataError } from "../../services/api/common/ErrorData";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllPlan } from "../../services/api/common/Plan";
import { getChapterById, updateChapter } from "../../services/api/admin/Chapter";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "linear-gradient(135deg,#1a1a2e,#16213e)",
  boxShadow: 24,
  p: 4,
  maxWidth: 800,
  maxHeight: "80vh",
  overflowY: "auto",
  borderRadius: "8px",
};
export default function UpdateChapter( ) {  
  const [work, setWork] = useState({

  });
  const navigate=useNavigate()
  const  {chapterId}=useParams()
   
  useEffect(()=>{
     getChapterById(chapterId).then(v=>{
        if(v==null){
            navigate("/admin/works")
        }
        setWork(v)
     }).catch(error=>{
        navigate("/admin/works")
     })
    getAllPlan().then(v=>{
      setPlans(v)
    }) 
  },[])
  const [isCreating,setIsCreating]=useState(false) 

  const updateChapters=()=>{
    setIsCreating(true)
    updateChapter(work, chapterId).then(v=>{
      alert("Cập nhật thành công chapter")
    }).catch(error=>{
      alert(getDataError(error).data)
    }).finally(e=>{
      setIsCreating(false)
    })
  }

  const [plans,setPlans]=useState([])

   

  const changeInput=(e)=>{
    setWork({...work,[e.target.name]:e.target.value})
  }
  

   

  return (
    <div> 
       
        <Box
          className="rounded-md text-white text-sm text-sm  w-10/12 md:w-5/12
        overflow-auto
        [&::-webkit-scrollbar]:w-1    <!-- Làm scrollbar nhỏ (width 4px, thay đổi số tùy ý) -->
            [&::-webkit-scrollbar-thumb]:bg-gray-500  <!-- Màu thumb (nút kéo) -->
            [&::-webkit-scrollbar-thumb]:rounded-full <!-- Bo tròn thumb -->
            [&::-webkit-scrollbar-track]:bg-gray-200
        "
          sx={style}
        >
          <div>
            <h1 className="text-center font-medium text-xl mb-5">
              UPDATE CHAPTER FORM
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
              {/* Budget Range */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-left text-sky-500 mb-2">
                  Name of chapter
                </label>
                <input
                  value={work.chapterName}
                  name="chapterName"
                  onChange={changeInput.bind(this)}
                  className="w-full p-1  ountline-none border border-gray-400 rounded-sm bg-transparent"
                />
              </div>

              {/* Start Date & Deadline */}
              <div className="flex flex-col">
                <label className="text-sm text-left font-medium  text-sky-500 mb-2">
                  Index of chapter
                </label>
                <input
                  value={work.chapterIndex}
                  name="chapterIndex"
                  type="number" 
                  onChange={changeInput.bind(this)}
                  className="w-full p-1  ountline-none border border-gray-400 rounded-sm bg-transparent"
                />
              </div>
            </div>
             


            {/* Project Description */}
            <div className="mt-6">
              <label className="text-sm text-left font-medium text-sky-500 mb-2 block">
                Content of chapter
              </label> 
              <textarea
                value={work.content}
                name="content"
                onChange={changeInput.bind(this)}
                placeholder="Add Description"
                className="w-full bg-transparent border border-gray-300 rounded-lg px-4 py-3 h-28 resize-none    outline-none"
              ></textarea>
            </div>
            <div className="flex flex-col">
                <label className="text-sm text-left mt-2 font-medium  text-sky-500 mb-2">
                  Choose plan of chapter
                </label>
                <select
                  value={work.planId}
                  name="planId"
                  onChange={changeInput.bind(this)}
                  className="w-full p-1  ountline-none border border-gray-400 rounded-sm bg-transparent"
                >
                  <option value={null}>Free tier</option>
                  {plans.map((v) => {
                    return <option value={v.id}>{v.planName}</option>
                  })}
                </select>
              </div>
             
            <button className="bg-sky-500 py-2 px-3 font-semibold rounded-sm mt-5 " disabled={isCreating} onClick={updateChapters}>{isCreating?<div className="flex gap-2 items-center"><LoaderIcon/> Updating chapter </div>:"Update chapter"}</button>
          </div>
        </Box> 
    </div>
  );
}
