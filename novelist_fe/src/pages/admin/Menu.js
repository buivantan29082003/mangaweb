import { useState } from "react";
import DiscIcon from "../../assets/icons/discover";
import LibraryIcon from "../../assets/icons/library";
import StarIcon from "../../assets/icons/Top";
import CategoryIcon from "../../assets/icons/Cate";
import icon from "../../assets/images/icon.png";
import Plan from "../../assets/icons/Plans";
import { Link } from "react-router-dom";
const MenuAdmin = () => {
  const [tabIndex,setTabIndex]=useState(0)
  const [tabs, setTabs] = useState([
    {
      to: "/admin/search",
      tabName: "Manage works",
      icon: <DiscIcon />,
    },
    {
      to: "/user/registration",
      tabName: "Registration",
      icon: <LibraryIcon />,
    },
    {
      to: "/user/traffic",
      tabName: "Traffic",
      icon: <StarIcon />,
    },
  ]);
  return (
    <>
      <div className="hidden px-6 md:block my-3">
        <LogoZing />
      </div>
      <div className="block  md:hidden my-3 flex justify-center">
        <img alt="" src={icon} className="w-9 h-9" />
      </div>
      {tabs.map((v,i) => {
        return (
          <>
            <div onClick={setTabIndex.bind(null,i)} className={`flex px-5 gap-4 w-full py-3 my-2 items-center cursor-pointer justify-center  lg:justify-start ${tabIndex===i?"border-l-2 border-l-violet filter":""}`}>
              {v.icon}
              <Link to={v.to}  className="hidden lg:inline">{v.tabName}</Link>
            </div>
          </>
        );
        // border-l border-l-violet
      })}
      <hr class="border-0 h-[1px] bg-white/10 my-6 mx-auto w-[80%]" />

      <div onClick={setTabIndex.bind(null,4)} className={`flex px-5 gap-4 w-full py-3 my-2 items-center cursor-pointer justify-center  lg:justify-start ${tabIndex===4?"border-l-2 border-l-violet filter":""}`}>
        <CategoryIcon />
        <Link className="hidden lg:inline">Account</Link>
      </div>
      <div onClick={setTabIndex.bind(null,5)} className={`flex px-5 gap-4 w-full py-3 my-2 items-center cursor-pointer justify-center  lg:justify-start ${tabIndex===5?"border-l-2 border-l-violet filter":""}`}>
        <Plan />
        <Link to={"/user/plans"} className="hidden lg:inline">Form Requests</Link>
      </div>
    </>
  );
};

export default MenuAdmin;

























function LogoZing() {
  return (
    <div className="flex flex-col mb-4">
      <div className="flex items-end gap-1 text-5xl font-bold">
        <span className="text-[#00AEEF]">Z</span>
        <span className="text-[#8DC63F]">i</span>
        <span className="text-[#F7941E]">n</span>
        <span className="text-[#ED145B]">g</span>
        <span className="text-white text-3xl ml-1 mb-1">mp3</span>
      </div>
    </div>
  );
}
