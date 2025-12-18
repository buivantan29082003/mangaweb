import React, { useEffect, useState } from "react"; 
import { Skeleton } from "@mui/material";
import { getWorkById } from "../../services/api/user/work";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../services/api/common/FormatDate";
import { formatReactionNumber } from "../../services/utils/FormatReactionNumber";  
import ChapterList from "../../components/common/ChapterList";
import CommentList from "../../components/common/CommentList";

export default function StoryDetailAdmin(){

 
  const [story, setStory] = useState(null);
  const {workId}=useParams()
  useEffect(()=>{ 
    getWorkById(workId).then(v=>{  
      setStory(v)
    })
  },[]) 
  return (
    <>
      <div className="w-full py-5 text-white flex justify-between">
      <div
        className="relative max-w-6xl w-full grid grid-cols-1 md:grid-cols-3"
        style={{
          backgroundImage: story ? `url(${story.image})` : "none",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Nếu story chưa load, hiển thị Skeleton */}
        {story == null ? (
          <>
            {/* LEFT */}
            <div className="md:col-span-2 gap-5 flex items-start space-x-4 bg-black/10 backdrop-blur-xl p-5 mt-4 md:mt-0">
              <div className="md:w-3/12">
                <Skeleton variant="rectangular" height={230} sx={{ bgcolor: "grey.900" }} />
                <Skeleton variant="rectangular" height={40} className="mt-2" sx={{ bgcolor: "grey.900" }} />
              </div>

              {/* RIGHT */}
              <div className="md:w-9/12 space-y-3">
                <Skeleton  variant="text" width="40%" height={24} sx={{ bgcolor: "grey.900" }}  />
                <Skeleton  variant="text" width="100%" height={24} sx={{ bgcolor: "grey.900" }}  />
                <Skeleton  variant="text" width="40%" height={24} sx={{ bgcolor: "grey.900" }}  />
                <Skeleton  variant="text" width="100%" height={24} sx={{ bgcolor: "grey.900" }}  />
                <Skeleton  variant="text" width="40%" height={24} sx={{ bgcolor: "grey.900" }}  />
                <Skeleton  variant="text" width="100%" height={24} sx={{ bgcolor: "grey.900" }}  />
                <Skeleton  variant="text" width="40%" height={24} sx={{ bgcolor: "grey.900" }}  />
                <Skeleton  variant="text" width="100%" height={24} sx={{ bgcolor: "grey.900" }}  />
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="md:col-span-3 lg:col-span-1 bg-black/10 backdrop-blur-xl p-5 space-y-3 mt-4 md:mt-0">
              <Skeleton  variant="text" width="100%" height={24} sx={{ bgcolor: "grey.900" }}  />
              <Skeleton  variant="text" width="40%" height={24} sx={{ bgcolor: "grey.900" }}  />
              <Skeleton  variant="text" width="100%" height={24} sx={{ bgcolor: "grey.900" }}  />
              <Skeleton  variant="text" width="40%" height={24} sx={{ bgcolor: "grey.900" }}  />
              <Skeleton  variant="text" width="100%" height={24} sx={{ bgcolor: "grey.900" }}  />
              <Skeleton  variant="text" width="40%" height={24} sx={{ bgcolor: "grey.900" }}  />
              <Skeleton  variant="text" width="100%" height={24} sx={{ bgcolor: "grey.900" }}  />
              <Skeleton  variant="text" width="40%" height={24} sx={{ bgcolor: "grey.900" }}  /> 
            </div>
          </>
        ) : (
          <>
            {/* Nội dung thật khi story đã có */}
            <div className="md:col-span-2 gap-5 flex items-start space-x-4 bg-black/60 backdrop-blur-xl p-5   md:mt-0">

              {/* LEFT */}
              <div className="md:w-3/12">
                <div className="rounded-md overflow-hidden">
                  <img
                    alt=""
                    src={story.image}
                    className="h-[230px] w-full"
                    style={{ objectFit: "cover" }}
                  /> 
                </div>
              </div>

              {/* RIGHT */}
              <div className="md:w-9/12">
                <p className="text-sm text-left">
                  Trang chủ / <span className="text-gray-200">{story.name}</span>
                </p>
                <h1 className="text-xl text-left font-semibold my-5">
                  {story.title}
                </h1> 

                <p className="text-sm text-left">{story.content}</p>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="md:col-span-3 lg:col-span-1 bg-black/60 backdrop-blur-xl p-5 space-y-3 mt-4 md:mt-0">
              {/* Ví dụ các thông tin sidebar */}
              <div className="flex justify-between border-b border-white/10 pb-2 text-sm">
                <span>Tác giả:</span>
                <span>{story.author.authorName}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2 text-sm">
                <span>Trạng thái:</span>
                <span>{story.statusWork.statusName}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2 text-sm">
                <span>Lượt xem:</span>
                <span>{formatReactionNumber(story.view)}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2 text-sm">
                <span>Lượt thích:</span>
                <span>{formatReactionNumber(story.like)}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2 text-sm">
                <span>Followers:</span>
                <span>{formatReactionNumber(story.following)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2 text-sm">
                <span>Chapter mới nhất:</span>
                <button className="bg-sky-600 px-3 py-1 rounded-lg text-sm font-medium">
                  Chapter {story.newChapter}
                </button>
              </div>
              <div className="space-y-1 text-sm">
                <span className="font-medium">Thể loại:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {story.genres.map((tag) => (
                    <span key={tag} className="px-3 border border-gray-200 py-1 bg-white/10 rounded-full text-xs">{tag.genreName}</span>
                  ))}
                </div>
              </div>
              <div className="text-sm pt-2">
                <span className="font-medium">Năm:</span> {formatDate(story.createdDate)}
              </div>
              <button className="w-full mt-2 bg-white/10 py-2 rounded-xl flex items-center justify-center gap-2 text-sm hover:bg-white/20 transition">
                💬 Bình luận (1718)
              </button>
            </div>
          </>
        )}
      </div> 
    </div>
    <div className="grid grid-cols-12 gap-4">
      {/* Trái */}
      <div className="col-span-12 md:col-span-8">
        <Tab chapterId={workId}/>
      </div>

      {/* Phải */}
      <div className="hidden md:block md:col-span-4">
        Phải
      </div>
    </div>

    </>
  );
}


const Tab=({chapterId})=>{
  const [tab,setTab]=useState(1);
  const navigate= useNavigate();
  
  return <>
    <div className="flex items-center gap-7 my-3 border-b border-sky-500">
      <span
        className={`cursor-pointer py-2 border-b-2 ${
          tab === 1 ? "border-b-sky-500 " : "border-b-transparent"
        }`}
        onClick={() => setTab(1)}
      >
        Danh sách chương
      </span>

      <span
        className={`cursor-pointer py-2 border-b-2 ${
          tab === 2 ? "border-b-sky-500  " : "border-b-transparent"
        }`}
        onClick={() => setTab(2)}
      >
        Bình Luận
      </span>
    </div>
    {tab===1?<ChapterList direct="/admin/chapter/update/"   workId={chapterId} />:<CommentList  workId={chapterId}/>}
    
  </>

}