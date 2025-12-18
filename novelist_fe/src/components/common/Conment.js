import { EyeOff, ReplyIcon } from "lucide-react";
import {   useState } from "react";
import { getCommentByCommentId } from "../../services/api/user/Comment";
import InputReply from "./InputReply";

const Comment = ({ comment, level = 0, workId }) => {
  const [pages, setPage] = useState({
    currentPage: 1,
    totalPage: 2,
  });
  const [commentChilds, setCommentChilds] = useState([]); 
  const [openReply, setOpenReply] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const getChildComment = () => {
    if (pages.currentPage < pages.totalPage) {
      getCommentByCommentId(comment.id, pages.currentPage).then((v) => {
        setCommentChilds((prev) => [...prev, ...v.data]);
        pages.currentPage += 1;
        setPage({
          ...pages,
          totalPage: v.totalPage,
          currentPage: v.currentPage,
        });
      });
    }
  };

  const pushComment = (commentSave) => {
    comment.childrenCount = comment.childrenCount + 1;  
    setCommentChilds((prev) => [...prev, commentSave]);
  }; 

  return (
    <>
      <div
        className={`text-left mt-3 p-3 t ml-4 mb-2  ${
          level === 0 ? "rounded-md bg-gray-900" : ""
        }`}
        style={{ marginLeft: level * 20 }}
      >
        <div className="w-full flex items-start gap-2">
          <img
            className="h-10 w-10 rounded-full overflow-hidden"
            src={comment.account.avatar}
            alt=""
          />
          <div className="text-left text-sm" id={`comment- `}>
            <p className="text-sky-500 font-semibold">
              {comment.account.fullName}{" "}
            </p>
            <a
              href={`#comment-${comment.parentId}`}
              className="mt-2 font-medium"
            >
              {comment.content}
            </a>
            <div
              onClick={setOpenReply.bind(null, true)}
              className="mt-2 cursor-pointer flex items-center gap-2"
            >
              <ReplyIcon size={14} />
              <span>Trả lời </span>
            </div>
          </div>
        </div>
        {openReply && (
          <InputReply
            pushItem={pushComment}
            workId={workId}
            setOpenReply={setOpenReply}
            parentId={comment.id}
          />
        )}
        {comment.childrenCount > 0 && (
          <div className="mt-3 cursor-pointer text-sm flex items-center gap-2 font-medium">
            {isHidden&&<>
              <ReplyIcon size={14} />
            <span
              onClick={() => {
                setIsHidden(false);
                getChildComment();
              }}
            >
              Xem {comment.childrenCount} phản hồi
            </span>
            </>}
            {!isHidden && (
              <div className="flex items-center ml-3 gap-2">
                <EyeOff size={14} />
                <span onClick={() => setIsHidden(true)}>Ẩn bớt</span>
              </div>
            )}
          </div>
        )}
        {!isHidden &&
          commentChilds.length > 0 &&
          commentChilds.map((v) => (
            <Comment workId={workId} key={v.id} comment={v} level={level + 1} />
          ))}
      </div>
    </>
  );
};

export default Comment;
