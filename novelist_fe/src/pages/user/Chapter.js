import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getChapterById, handleBookMark } from "../../services/api/user/Chapter";
import Bookmark from "../../components/user/BookMark";
import { getDataError } from "../../services/api/common/handleDataError";

const Chapter = () => {
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  useEffect(() => {
    getChapterById(chapterId)
      .then((v) => {
        setChapter(v);
      })
      .catch((error) => {});
  }, []);


  const handlingBookMark=()=>{
    handleBookMark(chapter.isBookMark?0:1,chapter.id).then(v=>{
      alert("Thành công")
      setChapter({...chapter,isBookMark:!chapter.isBookMark})
    }).catch(error=>{
      alert(getDataError(error).message)
    })
  }

  return (
    <>
      <div className="w-full  text-left">
        {chapter === null ? (
          <>
            <div className="md:col-span-2 gap-5 flex items-start space-x-4 bg-black/10 backdrop-blur-xl p-5 mt-4 md:mt-0">
              <div className="md:w-3/12">
                <Skeleton
                  variant="rectangular"
                  height={230}
                  sx={{ bgcolor: "grey.900" }}
                />
                <Skeleton
                  variant="rectangular"
                  height={40}
                  className="mt-2"
                  sx={{ bgcolor: "grey.900" }}
                />
              </div>

              {/* RIGHT */}
              <div className="md:w-9/12 space-y-3">
                <Skeleton
                  variant="text"
                  width="40%"
                  height={24}
                  sx={{ bgcolor: "grey.900" }}
                />
                <Skeleton
                  variant="text"
                  width="100%"
                  height={24}
                  sx={{ bgcolor: "grey.900" }}
                />
                <Skeleton
                  variant="text"
                  width="40%"
                  height={24}
                  sx={{ bgcolor: "grey.900" }}
                />
                <Skeleton
                  variant="text"
                  width="100%"
                  height={24}
                  sx={{ bgcolor: "grey.900" }}
                />
                <Skeleton
                  variant="text"
                  width="40%"
                  height={24}
                  sx={{ bgcolor: "grey.900" }}
                />
                <Skeleton
                  variant="text"
                  width="100%"
                  height={24}
                  sx={{ bgcolor: "grey.900" }}
                />
                <Skeleton
                  variant="text"
                  width="40%"
                  height={24}
                  sx={{ bgcolor: "grey.900" }}
                />
                <Skeleton
                  variant="text"
                  width="100%"
                  height={24}
                  sx={{ bgcolor: "grey.900" }}
                />
              </div>
            </div>
          </>
        ) : (
          // khác null
          <>
            {chapter.isError===true? (
              <>
                <div className="h-screen flex items-center justify-center">
                    <p className="text-center font-semibold text-lg mb-5">
                        You need to <Link to={"/user/plans"} className="py-1 px-2 bg-sky-500 text-white rounded-sm">sign up</Link> a plan subscription <span className="text-sky-500 font-bold">{chapter.data.planName}</span> or higher
                    </p>
                </div>
              </>
            ) : (
              <>
                <div
                  className="w-full bg-black/10 backdrop-blur-xl"
                  style={{
                    backgroundImage: `url(${
                      chapter != null ? chapter.work.image : ""
                    })`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="w-full gap-5 bg-black/10 backdrop-blur-xl flex items-start space-x-4 bg-black/60 backdrop-blur-xl p-5   md:mt-0">
                    {/* LEFT */}
                    <div className="md:w-3/12">
                      <div className="rounded-md overflow-hidden">
                        <img
                          alt=""
                          src={chapter.work.image}
                          className=" h-[250px] w-[200px]"
                          style={{ objectFit: "cover" }}
                        /> 
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="md:w-9/12">
                      <p className="text-sm text-left">
                        Trang chủ /{" "}
                        <span className="text-gray-200">
                          {chapter.work.name}
                        </span>
                      </p>
                      <h1 className="text-xl text-left font-semibold my-5">
                        {chapter.work.title}
                      </h1> 
                      <p className="text-sm text-left">
                        {chapter.work.content}
                      </p>
                      <div className="mt-5 flex gap-3 border-b border-white/10 pb-2 text-sm">
                        <span className="font-medium">Tác giả:</span>
                        <span>{chapter.work.author.authorName}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-3xl font-medium mt-5 flex items-center justify-center gap-4">
                  <Bookmark handleOnClick={handlingBookMark} size={30} className="cursor-pointer" isBookMark={chapter.isBookMark}/> <span>Chương {chapter.chapterIndex}: {chapter.chapterName} </span>
                </p>
                <p className="mt-5 w-10/12 mx-auto tracking-wide leading-[2rem]">
                  {chapter.content}
                </p>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Chapter;
