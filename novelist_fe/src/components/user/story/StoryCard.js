import { Eye, ThumbsUp } from "lucide-react";
import { formatReactionNumber } from "../../../services/utils/FormatReactionNumber";
import { useNavigate } from "react-router-dom";
import RankIcon from "../../common/Ranking";

const StoryCard = ({ story }) => {
  const navigate=useNavigate()
  return (
    <div className="cursor-pointer w-full rounded-md group overflow-hidden relative">
      
      <div onClick={()=>{
        navigate("/user/story/"+story.id)
      }} className="relative w-full h-[200px] overflow-hidden group rounded-sm cursor-pointer"> 
        <img
          src={story.image}
          alt={story.name}
          className="w-full h-full object-cover"
        /> 
        <img
          src={story.image}
          alt=""
          className="absolute top-0 left-0 h-full w-full object-cover -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
        /> 
        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> 
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-white font-medium text-md opacity-0 group-hover:opacity-100 transition-opacity  duration-500">
            Đọc truyện
          </p>
        </div>
      </div> 
      <div className="mt-3">
        <p className="font-medium text-center mt-5">{story.name}</p>
        <p className="mt-1 text-sm text-gray-400 text-center">{story.title}</p>
        <p className="mt-1 text-sm text-gray-400 text-center">
          Chương mới nhất {story.newChapter}
        </p>

        <div className="mt-2 flex gap-2 justify-center">
          <div className="px-3 py-[0.9px] transition-all duration-500 hover:border-green-600 gap-2 border border-gray-200 inline-flex items-center rounded-sm">
            <Eye className="inline-block" size={13} />
            <span className="text-xs">{formatReactionNumber(story.view)}</span>
          </div>
          <div className="px-2 py-[0.9px] transition-all duration-500 gap-2 border border-gray-200 inline-flex items-center rounded-sm">
            <ThumbsUp className="inline-block" size={13} />
            <span className="text-xs">
              {formatReactionNumber(story.like ?? story.view)}
            </span>
            
          </div>
        </div>
      </div>
    </div>
  );
}; 
export default StoryCard;
