import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box'; 
import Modal from '@mui/material/Modal';
import { getPaymentMethod, getPaymentUrl } from "../../services/api/user/Registration";
import { getAllPlan } from "../../services/api/common/Plan";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function Plan() { 
  const [mapIcon, setMapIcon] = useState(
    new Map([
      ["1", <>
        <svg
          width="90"
          height="90"
          viewBox="0 0 64 64"
          fill="none"
          stroke="#f8f7fbff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 18c1.5-3 5.5-3 7 0" />
          <path d="M24 18c1.5-2.5 5-2.5 6 0" />

          <line x1="10" y1="30" x2="18" y2="30" />
          <line x1="12" y1="34" x2="20" y2="34" />

          <circle cx="22" cy="46" r="10" />
          <circle cx="46" cy="46" r="10" />

          <line x1="22" y1="46" x2="32" y2="34" />
          <line x1="32" y1="34" x2="46" y2="46" />
          <line x1="32" y1="34" x2="28" y2="24" />
          <line x1="28" y1="24" x2="38" y2="24" />
          <line x1="38" y1="24" x2="40" y2="28" />

          <line x1="28" y1="24" x2="24" y2="24" />

          <line x1="40" y1="28" x2="46" y2="26" />
          <line x1="46" y1="26" x2="48" y2="28" />
        </svg>
      </>],
      ["2",<>
      <svg 
      width="80" 
      height="80" 
      viewBox="0 0 64 64" 
      fill="none" 
      stroke="#f47d7d" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {/* Mặt trời */}
      <circle cx="50" cy="12" r="4" />

      {/* Đám mây */}
      <path d="M12 18c0-3 2-5 5-5 2 0 4 1 5 3 1-1 3-1 4-1 3 0 5 2 5 5H12z" />

      {/* Thân xe */}
      <rect x="14" y="28" width="36" height="14" rx="3" />

      {/* Mui xe */}
      <path d="M20 28l4-9h16l4 9" />

      {/* Cửa */}
      <line x1="32" y1="28" x2="32" y2="42" />

      {/* Bánh xe */}
      <circle cx="22" cy="42" r="5" />
      <circle cx="42" cy="42" r="5" />

      {/* Đường */}
      <line x1="10" y1="52" x2="54" y2="52" />
      <line x1="16" y1="56" x2="48" y2="56" />
    </svg>
      </>],
      ["3",<>
       <svg
      width="80"
      height="80"
      viewBox="0 0 64 64"
      fill="none"
      stroke="#38bdf8"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Mây trên */}
      <path d="M12 16c0-2 2-4 4-4 1 0 2 .5 3 1.5 1-1 2-1.5 3-1.5 2 0 4 2 4 4H12z" />

      {/* Mây dài */}
      <line x1="32" y1="18" x2="50" y2="18" />
      <line x1="34" y1="22" x2="48" y2="22" />

      {/* Máy bay */}
      <path d="M10 34l18-6 4-12 6 1-3 12 17 4c2 .5 3 3 1 4l-20 6-6 10-5-1 2-10-8-1-4 3-4-1 4-6-2-3z" />

      {/* Mây dưới */}
      <path d="M20 48c0-2 2-4 5-4 2 0 4 1 5 2 1-1 3-2 5-2 3 0 5 2 5 4H20z" />
    </svg>
      </>]
    ])
  );

  const [plans,setPlans]=useState([

  ])
  useEffect(()=>{
    
    getAllPlan().then(v=>{
      setPlans(v)
    })
  },[])
  const [open,setOpen]=useState(false)
  const handleClose=()=>{
    setOpen(false);
  }

  const getUrl=(paymentType)=>{
    getPaymentUrl(paymentType, paymentInfo.planId).then(v=>{
      window.location.href = v;
    }).catch(error=>{
      alert("Có lỗi lấy url thanh toán, vui lòng thử lại")
    })
  }
  
  const [paymentInfo,setPaymentInfo]=useState({
    paymentType:null,
    planId:null
  })

  const handleOpen=()=>{
    setOpen(true)
  }

  const [paymentMethods,setPaymentMethods]=useState([])

  useEffect(()=>{
    getPaymentMethod().then(v=>{
      setPaymentMethods(v)
    }).catch(error=>{
    
    })
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-900 to-black rounded-sm p-10 flex flex-col items-center">
      <h1 className="text-white text-3xl font-bold">CHOOSE YOUR PLAN</h1>
      <p className="text-blue-100 mt-3 text-center max-w-xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Universa enim
        illorum ratione cum tota vestra confligendum puto
      </p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="rounded-md" sx={style}>
          <p className="text-center mt-2 mb-6 text-sky-700 font-semibold text-lg" component="h2">
            Chọn loại hình thanh toán
          </p>
          <div className="flex items-center gap-3">
              {paymentMethods.map(v=>{
                return <div className="cursor-pointer" onClick={()=>{
                  getUrl(v.id)
                }}>
                  <img className="rounded-md overflow-hidden shadow-md w-20 h-20 object-fit-cover" alt="" src={v.icon}/>
                  <p className="text-center mt-2 text-sm font-semibold text-sky-700">{v.name}</p>
              </div>
              })}
          </div>
        </Box>
      </Modal>
      <div className="grid md:grid-cols-3 gap-8 mt-12 w-full max-w-6xl px-4">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-black/100 backdrop-blur-xl filter rounded-2xl shadow-lg p-8  shadow-md filter ${
              plan.border
            } transition-all duration-300 ${
              index % 2 === 0 ? "mt-10" : "mt-0"
            }`}
          >
            <div className="text-center">
              <div className={`text-6xl flex justify-center ${plan.color}`}>
                {mapIcon.get(""+plan.id)} {plan.planId}
              </div>
              <h2 className="text-xl font-bold mt-4">{plan.planName}</h2>
              <p className={`text-2xl font-semibold mt-2 ${plan.color}`}>
                {plan.fee} VND
              </p>
            </div>

            <ul className="mt-6 space-y-3">
              { ["Unlimited Access", "On-demand request", "Lifetime Access"].map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-white">
                  <span className="text-green-500 font-bold">•</span> {f}
                </li>
              ))}
            </ul>

            <button onClick={()=>{
              setPaymentInfo({...paymentInfo,planId:plan.planId})
              handleOpen()
            }}
              className={`mt-6 w-full text-white font-semibold py-2 rounded-sm ${plan.button}`}
            >
              CHOOSE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
