import { MdSpaceDashboard } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineInsertComment } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";
import { RiArticleFill } from "react-icons/ri";
import { IoMdArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signout } from "../redux/userSlice/user";
const Sidebar = () => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
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
          className="text-white flex flex-col md:flex-row items-center text-xl gap-2 pt-2 mx-6"
          key={item.id}
          to={item.path}
        >
          {item.icon}
          <p className="text-[8px] md:text-xl">{item.title}</p>
        </NavLink>
      ))}
      <div
        onClick={() => {
          setModal(!modal);
        }}
        className="text-white flex flex-col md:flex-row items-center text-xl gap-2 pt-2 mx-6"
      >
        <IoMdArrowForward />
        <p className=" text-[8px] md:text-xl">Sign Out</p>
        
      </div>
      {modal && (
          <div className="top-0 left-0 w-screen h-screen fixed bg-modal backdrop-blur-sm overflow-hidden ">
            <div className=" fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] 
             rounded-md shadow-2xl min-w-[300px] bg-primary min-h-[200px] md:min-w-[450px] md:min-h-[300px]
             flex flex-col justify-around items-center
            ">
              <p className="text-2xl font-semibold">Are You Sure ?</p>
             <div className="flex  w-full justify-around ">
             <button  className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-md px-2 py-1 
         font-semibold text-white"
         onClick={()=>{dispatch(signout())
          setModal(!modal)
         }}
         >Sign Out</button>
              <button  className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-md px-2 py-1 
         font-semibold text-white"
          onClick={()=>{setModal(!modal)}}
         >Cancel</button>
             </div>
            </div>
          </div>
        )}

    </div>
  );
};

export default Sidebar;
