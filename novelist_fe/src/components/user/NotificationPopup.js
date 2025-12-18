import * as React from "react";
import Popover from "@mui/material/Popover";
import { getNotification, setReaded } from "../../services/api/user/Notification";
import { Link, useNavigate } from "react-router-dom";
import LoadingRow from "../common/LoadingRow";
import { getDataError } from "../../services/api/common/ErrorData";

export default function PopupNotification({ children }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [data, setData] = React.useState({
    currentPage: 1,
    totalPage: 1,
    data: [],
  });

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isReaded, setIsReaded] = React.useState(1);
  const getAllNotification = () => {
    setIsLoading(true);
    getNotification(data.currentPage, isReaded)
      .then((v) => {
        setData(v);
      })
      .catch((e) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    getAllNotification();
  }, [isReaded]);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="bg-transparent">
      <div aria-describedby={id} onClick={handleClick}>
        {children}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="bg-transparent p-3 w-[300px]">
          <p className="font-bold text-md my-4">Thông Báo</p>
          <div className="flex gap-2">
            <button
              className={`py-1 px-3 rounded-full ${
                isReaded === 1 ? "bg-sky-100 text-sky-500" : "bg-gray-100"
              }`}
              onClick={() => {
                data.currentPage = 1;
                data.data = [];
                setIsReaded(1);
              }}
            >
              Tất cả
            </button>
            <button
              className={`py-1 px-3 rounded-full ${
                isReaded === 0 ? "bg-sky-100 text-sky-500" : "bg-gray-100"
              }`}
              onClick={() => {
                data.currentPage = 1;
                data.data = [];
                setIsReaded(0);
              }}
            >
              Chưa đọc
            </button>
          </div>
          {isLoading && <LoadingRow quanityRow={10} color="grey.100" />}
          {data.data.length===0&&isLoading===false&&<p className="text-center font-bold   my-4">Nothing notification</p>}
          {data.data.map((v) => {
            return <NotificationItem notification={v} />;
          })}
        </div>
      </Popover>
    </div>
  );
}

const NotificationItem = ({ notification }) => {
  const [isReaded, setIsReaded] = React.useState(notification.isReaded);
  const navigate = useNavigate();
  const setRead=()=>{
    if(isReaded===0){
      setReaded(notification.notificationId).then(v=>{
      setIsReaded(1)
    }).catch(error=>{
      alert(getDataError(error).data)
    })
    }
  }
  return (
    <>
      <div
        onClick={(e) => {
          setRead()
          navigate(notification.notification.link);
        }}
        className="mt-2 cursor-pointer border-b mb-2 pb-2"
      ><p className="text-md font-semibold">
        {notification.notification.title}{" "}
        {isReaded===0&&
          
          <span class="inline-block w-2 h-2 bg-sky-500 rounded-full"></span>
        }
        </p>
        <p className="text-sm">{notification.notification.content}</p>
      </div>
    </>
  );
};
