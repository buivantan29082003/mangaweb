import { useEffect, useState } from "react";
import { getAccount } from "../../services/api/user/AccountController";
import Box from "@mui/material/Box";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "linear-gradient(135deg,#1a1a2e,#16213e)",
  boxShadow: 24,
  p: 4,
  maxWidth: 800,
  maxHeight: "80vh",
  overflowY: "auto",
  borderRadius: "8px",
};
const ManageAccountUser = () => {
  const [account, setAccount] = useState({});

  useEffect(() => {
    getAccount()
      .then((v) => {
        setAccount(v);
      })
      .catch((error) => {
        // alert(getD)
      });
  },[]);
  const changeInput = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Box
        className="rounded-md text-white text-sm text-sm  w-10/12 md:w-4/12
        overflow-auto
        [&::-webkit-scrollbar]:w-1    <!-- Làm scrollbar nhỏ (width 4px, thay đổi số tùy ý) -->
            [&::-webkit-scrollbar-thumb]:bg-gray-500  <!-- Màu thumb (nút kéo) -->
            [&::-webkit-scrollbar-thumb]:rounded-full <!-- Bo tròn thumb -->
            [&::-webkit-scrollbar-track]:bg-gray-200
        "
        sx={style}
      >
        <div>
          <h1 className="text-center font-medium text-xl mb-5">
            ADD WORK FORM
          </h1> 
            
            <div className="flex flex-col mb-4"> 
              <img alt=""
                src={account.avatar}
                name="fullName"
                onChange={changeInput.bind(this)}
                className="ountline-none border border-gray-400 rounded-full h-20 w-20 bg-transparent"
              />
              <button>ChangeIamge</button>
            </div>

            {/* Budget Range */}
            <div className="flex flex-col mb-4">
              <label className="text-sm font-medium text-left  text-sky-500 mb-4">
                FullName
              </label>
              <input
                value={account.fullName}
                name="fullName"
                onChange={changeInput.bind(this)}
                className="w-full p-1  ountline-none border border-gray-400 rounded-sm bg-transparent"
              />
            </div>  
          {/* Start Date & Deadline */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-left text-sky-500 mb-2">
                Email
              </label>
              <input
                value={account.email}
                className="w-full p-1  ountline-none border border-gray-400 rounded-sm bg-transparent"
              />
            </div>
          </div>
      </Box>
    </>
  );
};

export default ManageAccountUser;
