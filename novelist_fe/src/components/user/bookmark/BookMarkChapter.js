import { useEffect, useState } from "react";
import { getBookMark } from "../../../services/api/user/BookMark";
import BookmarkAnimated from "../BookMark";
import { handleBookMark } from "../../../services/api/user/Chapter";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import LoadingRow from "../../common/LoadingRow";
export default function BookMarkChapter( ) {
  const [chapters,setChapters]=useState({
    totaPage:1,
    data:[]
  })
  const [filters,setFilters]=useState({
        query:"",
        currentPage:1
    })

  const getBookMarks=async()=>{
    setIsLoading(true)
   getBookMark(filters.query, filters.currentPage).then(v=>{
      filters.currentPage=v.currentPage
      setChapters(v)
    }).catch(error=>{

    }).finally(()=>{
      setIsLoading(false)
    })
  }

  const unBookMarks=(chapterId)=>{
    handleBookMark(0,chapterId).then(v=>{
      setChapters({...chapters,data:chapters.data.filter(v=>v.chapterId!==chapterId)})
    })
  }

 

  useEffect(()=>{
    getBookMarks()
  },[])

  const [isLoading,setIsLoading]=useState(false)
  
   

  return (
    <div className="w-full  text-left text-gray-300 text-sm">
    <div className="flex mt-4 flex-wrap mb-4 items-center gap-5">
      <Stack spacing={2}> 
      <Pagination onChange={(e,value)=>{
        filters.currentPage=value
        getBookMarks()
      }}
      count={chapters.totalPage}
      variant="outlined"
      color="primary"
      sx={{
        "& .MuiPaginationItem-root": {
          color: "white",   
        }, 
      }}
    /> 
    </Stack>
    <input value={filters.query} onChange={e=>setFilters({...filters,query:e.target.value})} placeholder="enter your keywork" className="border border-gray-800 outline-none py-1 px-2 rounded-sm bg-transparent"/>
    <button onClick={getBookMarks} className="py-1 px-3 rounded-sm bg-violet-500 text-white font-semibold hover:bg-violet-700">Search</button>
    </div>
      {/* Header */}

      {isLoading===true&&<LoadingRow quanityRow={8}/>}
      

      {/* Body */}
      {!isLoading&&<>
      <div className="grid grid-cols-12 px-4 py-2 text-md font-semibold  text-gray-400">
        <div className="col-span-6">Chapter</div> 
        <div className="col-span-2 text-right">Action</div>
      </div>
        {chapters.data.map((v) => (
        <div
          key={v.id}
          className="grid my-2 grid-cols-12 items-center px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer"
        >
          <div className="col-span-6 flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-md overflow-hidden">
              <img
                alt=""
                src={v.chapter.work.image}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition">
                ▶
              </div>
            </div>

            <div>
              <div className="font-medium text-white">{v.chapter.chapterName}</div>
              <div className="text-gray-400 text-xs mt-3">{v.chapter.work.title}</div>
            </div>
          </div> 
          <div className="col-span-2 flex items-center justify-end gap-3">
            <BookmarkAnimated handleOnClick={unBookMarks.bind(null,v.chapterId)} isBookMark={true} color="sky-500"/>
            <span className="text-gray-400"> </span>
          </div>
        </div>
      ))}
      </>}
    </div>
  );
}
