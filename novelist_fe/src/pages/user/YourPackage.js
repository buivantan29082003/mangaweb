import { useEffect, useState } from "react" 
import { getAllPlan } from "../../services/api/common/Plan";
import { Pagination, Stack } from "@mui/material";
import TransactionView from "../../components/admin/TransactionView";
import BankCode from "../../components/common/BankCode";
import { formatDate, timeLeft } from "../../services/api/common/FormatDate";
import LoadingRow from "../../components/common/LoadingRow";
import { getAllRegistration } from "../../services/api/user/Registration";

const MyPackage=()=>{
    
    const [data,setData]=useState({
        
        totalPage:1,
        data:[]
    });
    const [isLoading,setIsLoading]=useState(false);
    const [filters,setFilters]=useState({
        planId:-1,
        currentPage:1,
    })
    const getRegis=()=>{
        setIsLoading(true)
        getAllRegistration(filters).then(v=>{
            setData(v)
        }).catch(error=>{

        }).finally(setIsLoading.bind(null,false))
    }
    const [plans,setPlans]=useState([]);
    useEffect(() => { 
        getRegis()
        getAllPlan()
          .then((v) => {
            setPlans(v);
          })
          .catch((error) => {});
      }, [])
    return <>
        <p className="text-left mt-2 text-sm ">
        Admin / <span className="font-semibold">Registration</span>
      </p>
      <div className="flex mt-4 flex-wrap mb-4 items-center gap-5">
        <Stack spacing={2}>
          <Pagination
            onChange={(e, value) => {
              filters.currentPage = value;
              // getBookMarks()
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
        <select
          type="datetime-local"
          value={filters.planId}
          name="planId"
          onChange={v=>{
            setFilters({...filters,planId:v.target.value})
          }}
          placeholder="enter your keywork"
          className="border border-gray-800 outline-none py-1 px-2 rounded-sm bg-transparent"
        >
            <option value={-1}>All</option>
          {plans.map((v) => {
            return <option value={v.id}>{v.planName}</option>;
          })}
        </select>
        <button
          onClick={getRegis}
          className="py-1 px-3 rounded-sm bg-violet-500 text-white font-semibold hover:bg-violet-700"
        >
          Search
        </button>
      </div>
      {isLoading === true ? (
        <LoadingRow quanityRow={20} />
      ) : (
        <>
          <div className="grid grid-cols-12 text-left px-4 py-2 text-md font-semibold  text-gray-400">
            <div className="col-span-2">Registration</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 ">BankCode</div>
            <div className="col-span-2 ">ExpireDate</div>
            <div className="col-span-2">Plan</div>
            <div className="col-span-2 ">View Transaction</div>
          </div>
          {data.data.map((v) => (
            <div
              key={v.id}
              className="text-left grid my-2 grid-cols-12 items-center px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer"
            >
              <div className="col-span-2 text-violet-500 flex items-center gap-3">
                <p>
                  #{v.id} - {formatDate(v.registrationDate)}
                </p>
              </div>
              <div className="col-span-2 flex items-center gap-3">
                <span className="text-gray-400 text-sky-500 font-semibold">
                  {v.isEnded===1?"Ended":"On going"}
                </span>
              </div>
              <div className="col-span-2 flex items-center   text-left gap-3">
                <BankCode
                  bankCode={"VNPAY"}
                  className={"rounded-md w-10 h-10 objectfit-cover"}
                />
                <span className="text-gray-400">VNPAY</span>
              </div>
              <div className="col-span-2 flex items-center  gap-3">
                {v.isEnded===0?timeLeft(v.registrationDate,v.expireDate):0} Days
              </div>
              <div className="col-span-2 flex items-center gap-3">
                <span className="text-gray-400 text-sky-500 font-semibold">
                  {v.plan.planName}
                </span>
              </div>
              <div className="col-span-2 flex items-center  gap-3">
                <TransactionView visibleElement={<span className="text-white bg-violet-500 py-1 px-3 rounded-sm ">
                  View
                </span>} transaction={v.transaction}/>
              </div>
              
            </div>
          ))}
        </>
      )}
    </>
}

export default MyPackage