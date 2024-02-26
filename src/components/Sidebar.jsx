import { MdSpaceDashboard } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineInsertComment } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";
import { RiArticleFill } from "react-icons/ri";
import { IoMdArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useState } from "react";
const Sidebar = () => {
  const [modal, setModal] = useState(false);

  const items = [
    {
      id: "1",
      title: "Dashboard",
      path: "/dashboard/dash",
      icon: <MdSpaceDashboard />,
    },
    {
      id: "2",
      title: "Profile",
      path: "/dashboard/profile",
      icon: <IoPersonSharp />,
    },
    {
      id: "3",
      title: "Comments",
      path: "/dashboard/comments",
      icon: <MdOutlineInsertComment />,
    },
    {
      id: "4",
      title: "Users",
      path: "/dashboard/users",
      icon: <PiUsersThreeFill />,
    },
    {
      id: "5",
      title: "Posts",
      path: "/dashboard/posts",
      icon: <RiArticleFill />,
    },
  ];

  return (
    <div className=" h-screen bg-slate-900 w-fit">
      {items?.map((item) => (
        <NavLink
          className="text-white flex items-center text-xl gap-2 pt-2 mx-6"
          key={item.id}
          to={item.path}
        >
          {item.icon}
          <p className="hidden md:inline">{item.title}</p>
        </NavLink>
      ))}
      <div
        onClick={() => {
          setModal(!modal);
        }}
        className="text-white flex items-center text-xl gap-2 pt-2 mx-6"
      >
        <IoMdArrowForward />
        <p>Sign Out</p>
        {modal && (
          <div className="top-0 left-0 w-screen h-screen fixed bg-modal backdrop-blur-sm overflow-hidden ">
            <div className=" fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
              <p>Are You Sure ?</p>
              <button>Sign Out</button>
              <button>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
