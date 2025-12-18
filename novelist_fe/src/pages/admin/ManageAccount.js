import { Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import LoadingRow from "../../components/common/LoadingRow";
import { changeStatus, getAllAccount } from "../../services/api/admin/Account";
import { getDataError } from "../../services/api/common/ErrorData";

const ManageAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    query: "",
    currentPage: 1,
    status: -1,
  });
  const [data, setData] = useState({
    currentPage: 1,
    totalPage: 1,
    data: [],
  });

  const getAccount = () => {
    getAllAccount(filters)
      .then((v) => {
        setData(v);
      })
      .catch((errror) => {});
  };

  const changeStatusAccount = ( status,accountId, index) => {
    changeStatus(status, accountId)
      .then((v) => {

        setData((prev) => ({
          ...prev,
          data: prev.data.map((item, i) =>
            i === index ? { ...item, isActive: status } : item
          ),
        }));
        alert("Chinh sua thanh cong")
      })
      .catch((error) => {
        alert(getDataError(error).data);
      });
  };

  useEffect(getAccount, []);

  const changeInput = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <p className="text-left mt-2 text-sm ">
        {" "}
        Admin / <span className="font-semibold">Account</span>{" "}
      </p>
      <div className="flex mt-4 flex-wrap mb-4 items-center gap-5">
        <Stack spacing={2}>
          <Pagination
            onChange={(e, value) => {
              filters.currentPage = value;
              getAccount();
            }}
            count={data.totalPage}
            variant="outlined"
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "white",
              },
            }}
          />
        </Stack>
        <input
          value={filters.query}
          name="query"
          onChange={changeInput}
          placeholder="enter your keywork"
          className="border border-gray-800 outline-none py-1 px-2 rounded-sm bg-transparent"
        />

        <button
          onClick={getAccount}
          className="py-1 px-3 rounded-sm bg-violet-500 text-white font-semibold hover:bg-violet-700"
        >
          Search
        </button>
      </div>
      <div className="flex my-3 gap-5">
        <button onClick={()=>setFilters({...filters,status:-1})} className={`px-3 py-1 rounded-full border border-gray-700 ${filters.status===-1?"bg-violet-500":""}`}>All</button>
        <button onClick={()=>setFilters({...filters,status:1})} className={`px-3 py-1 rounded-full border border-gray-700 ${filters.status===1?"bg-violet-500":""}`}>Active</button>
        <button onClick={()=>setFilters({...filters,status:0})} className={`px-3 py-1 rounded-full border border-gray-700 ${filters.status===0?"bg-violet-500":""}`}>Not active</button>
      </div>
      {isLoading === true ? (
        <LoadingRow quanityRow={20} />
      ) : (
        <>
          <div className="grid grid-cols-12 text-left px-4 py-2 text-md font-semibold  text-gray-400">
            <div className="col-span-4">Account info</div>
            <div className="col-span-4">Email</div>
            <div className="col-span-2 ">Status</div>
            <div className="col-span-2">Action</div>
          </div>
          {data.data.map((v, index) => (
            <div
              key={v.id}
              className="text-left grid my-2 grid-cols-12 items-center px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer"
            >
              <div className="col-span-4 text-violet-500 flex items-center gap-3">
                <img alt="" className="h-10 w-10 rounded-full" src={v.avatar} />
                <p>{v.fullName}</p>
              </div>
              <div className="col-span-4 flex items-center gap-3">
                {v.email}
              </div>
              <div className="col-span-2 flex items-center gap-3">
                <span
                  className={`  font-semibold ${
                    v.isActive === 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {v.isActive === 1 ? "Hoat Dong" : "Ngung Hoat Dong"}
                </span>
              </div>
              <div className="col-span-2 flex items-center  gap-3">
                {v.isActive === 0 && (
                  <button
                    onClick={changeStatusAccount.bind (null, 1, v.id, index)}
                    className="p-1 px-3 hover:text-green-900 rounded-sm border border-green-500 hover:bg-green-500"
                  >
                    Make visible
                  </button>
                )}
                {v.isActive === 1 && (
                  <button
                    onClick={changeStatusAccount.bind (null, 0, v.id, index)}
                    className="p-1 px-3 hover:text-red-900 rounded-sm border border-red-500 hover:bg-red-500"
                  >
                    Make disable
                  </button>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default ManageAccount;
