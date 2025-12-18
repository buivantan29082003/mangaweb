import { useState } from "react";
import DiscIcon from "../../assets/icons/discover";
import LibraryIcon from "../../assets/icons/library";
import StarIcon from "../../assets/icons/Top";
import CategoryIcon from "../../assets/icons/Cate";
import icon from "../../assets/images/icon.png";
import Plan from "../../assets/icons/Plans";
import {useNavigate } from "react-router-dom";
const Menu = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();
  const [tabs, setTabs] = useState([
    {
      to: "/user/search",
      tabName: "Khám phá",
      icon: <DiscIcon />,
    },
    {
      to: "/user/bookmarks",
      tabName: "BookMarks",
      icon: <LibraryIcon />,
    },
    {
      to: "/user/account",
      tabName: "Account",
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
      {tabs.map((v, i) => {
        return (
          <>
            <div
              onClick={() => {
                setTabIndex(i);
                navigate(v.to);
              }}
              className={`flex px-5 gap-4 w-full py-3 my-2 items-center cursor-pointer justify-center  lg:justify-start ${
                tabIndex === i ? "border-l-2 border-l-violet filter" : ""
              }`}
            >
              {v.icon}
              <span className="hidden lg:inline">{v.tabName}</span>
            </div>
          </>
        );
      })}
      <hr class="border-0 h-[1px] bg-white/10 my-6 mx-auto w-[80%]" /> 
      <div
        onClick={() => {
          setTabIndex(4);
          navigate("/user/mypackage");
        }}
        className={`flex px-5 gap-4 w-full py-3 my-2 items-center cursor-pointer justify-center  lg:justify-start ${
          tabIndex === 4 ? "border-l-2 border-l-violet filter" : ""
        }`}
      >
        <CategoryIcon />
        <span className="hidden lg:inline">Your Package</span>
      </div>
      <div
        onClick={() => {
          setTabIndex(5);
          navigate("/user/plans");
        }}
        className={`flex px-5 gap-4 w-full py-3 my-2 items-center cursor-pointer justify-center  lg:justify-start ${
          tabIndex === 5 ? "border-l-2 border-l-violet filter" : ""
        }`}
      >
        <Plan />
        <span className="hidden lg:inline">Packages</span>
      </div>
    </>
  );
};

export default Menu;

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
