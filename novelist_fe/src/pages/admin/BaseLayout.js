import { Outlet } from "react-router-dom"; 
import MenuAdmin from "./Menu";
import Header from "../user/Header";

const AdminBaseLayout = () => {
  return (
    <>
      <div className="flex  h-screen w-full oveflow-scroll text-white bg-[#170f23]">
        <div className="md:w-2/12    w-2/12 h-screen bg-[#231b2e] text-md font-medium  ">
          <MenuAdmin />
        </div>
        <div className="md:w-10/12 px-3 h-full overflow-auto
        [&::-webkit-scrollbar]:w-1    <!-- Làm scrollbar nhỏ (width 4px, thay đổi số tùy ý) -->
            [&::-webkit-scrollbar-thumb]:bg-gray-500  <!-- Màu thumb (nút kéo) -->
            [&::-webkit-scrollbar-thumb]:rounded-full <!-- Bo tròn thumb -->
            [&::-webkit-scrollbar-track]:bg-gray-200
        lg:px-10  w-10/12 h-screen ">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminBaseLayout;
