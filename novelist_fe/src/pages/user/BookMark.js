import { useState } from "react";
import BookMarkChapter from "../../components/user/bookmark/BookMarkChapter";
import Following from "../../components/user/bookmark/Following";

const BookMark=()=>{
    const [tab,setTab]=useState(0);
    
    return <>
        <div className="flex items-center gap-10 border-b border-gray-800 mt-5 cursor-pointer">
            <p onClick={setTab.bind(null,0)} className={ `pb-3 border-b ${tab===0?"border-violet-500":"border-transparent"}`}>Chapters</p>
            <p onClick={setTab.bind(null,1)}  className={ `pb-3 border-b ${tab===1?"border-violet-500":"border-transparent"}`}>Following</p>
         </div>
        {tab===0&&<BookMarkChapter  />}
        {tab===1&&<Following  />} 
    </>
}

export default BookMark;