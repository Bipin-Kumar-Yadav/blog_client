import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { useSelector } from "react-redux";
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useSelector((state)=> state.user.currentUser);
  console.log(currentUser)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [hamBug, setHamBug] = useState(false);
  const formSubmit = () => {};

  return (
    <div className="bg-primary ml-2 mr-2 lg:ml-10 lg:mr-10">
      <div className="  mx-auto border-b-2 py-2 flex items-center justify-between">

       {/* icon  */}
        <NavLink to={"/"}>
          <span className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2 py-1 rounded-md text-xl  font-semibold">
            {`Bipin's`}
          </span>
          <span className=" text-black font-semibold text-xl">Blog</span>
        </NavLink>
          {/* search bar singin btn and avtar  */}
        <div className="flex gap-5">
        <form onSubmit={handleSubmit(formSubmit)} className="flex items-center">
          <div className="flex flex-col">
            <div className=" border-2 hidden  rounded-md md:inline-flex">
              <input
                type="text"
                className=" outline-none my-2 mx-2 bg-transparent "
                placeholder="Search..."
                {...register("query", {
                  required: true,
                })}
              />
              <AiOutlineSearch className=" text-xl  mx-2 my-2" />
            </div>
            {errors.query && <span>Query is required</span>}
          </div>
          <button className=" md:hidden border-2 rounded-md">
            <AiOutlineSearch className=" text-xl mx-2 my-2" />
          </button>
        </form>
        <div className="flex items-center gap-2 md:order-2">
          {
            currentUser ? (<div onClick={()=>{navigate("/dashboard")}}>
             <img src={currentUser?.user?.profilePicture} alt="Profile picture" width="45px" className="rounded-full"/>
            </div>) : (<button
            className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-md px-2 py-1 
         font-semibold text-white"
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </button>)
          }
          {!hamBug ? (
            <RxHamburgerMenu
              onClick={() => setHamBug(!hamBug)}
              className=" md:hidden text-2xl"
            />
          ) : (
            <GrClose
              onClick={() => setHamBug(!hamBug)}
              className="md:hidden text-2xl"
            />
          )}
        </div>
        </div>
      </div>
      <div>
        {hamBug && (
          <div className="flex flex-col justify-center">
            <NavLink
              className={
                location.pathname === "/"
                  ? " text-indigo-700 text-center"
                  : " text-center"
              }
              to={"/"}
            >
              Home
            </NavLink>
            <NavLink
              className={
                location.pathname === "/dashboard"
                  ? " text-indigo-700 text-center"
                  : " text-center"
              }
              to={"/dashboard"}
            >
              Dashboard
            </NavLink>
            <NavLink
              className={
                location.pathname === "/project"
                  ? "text-indigo-700 text-center"
                  : " text-center"
              }
              to={"/project"}
            >
              Project
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
