import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setLoading, signin } from "../redux/userSlice/user";
import OAuth from "../components/OAuth";

const Signin = () => {
  const loading = useSelector((state)=>state.user.loading);
  const currentUser = useSelector((state)=>state.user.currentUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const formSubmit = async(data) =>{
  try {
      dispatch(setLoading(true));
      console.log(loading,currentUser);
      const res = await fetch("/api/auth/signin",{
        method : 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify(data),
      })
      if(res.ok){
      const resData = await res.json();
      dispatch(setLoading(false));
      dispatch(signin(resData));
      console.log(loading,currentUser)
      navigate('/');
      reset();
      }
      else{
        reset();
        dispatch(setLoading(false))
        navigate('/sign-in')
      }
  } catch (error) {
    console.log("Frontend error while login ",error)
  }
  }
  return (
    <div className="bg-primary  mx-auto max-w-3xl flex flex-col md:flex-row justify-between h-screen overflow-y-hidden">
      <div className="mt-[25%] md:w-[45%] ml-2">
       <div className="flex gap-2 w-fit  mx-auto">
       <span
          className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2 py-1
                 rounded-md text-4xl text-white 
                 font-bold"
        >{`Bipin's`}</span>
        <span className="font-bold text-4xl text-blue-900">Blog</span>
       </div>
        <p className="mt-2 text-slate-900">
          This is a demo project. You can sign in with your email and password.
        </p>
      </div>
      <div className="ml-2 mr-2 h-full mt-[15%] md:w-[45%]">
        <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-4">
          <p className="flex flex-col">
            Your email:
            <input
            type="text"
              className=" outline-none  bg-gray-200 border-1 rounded-md px-2 py-2"
              placeholder="name@company.com"
              {...register("email",{
                required:true,
              })}
            />
            {errors.email && <span>Email is Required.</span>}
          </p>
          <p className="flex flex-col">
            Your password:
            <input
            type="password"
              className=" outline-none  bg-gray-200 border-1 rounded-md px-2 py-2"
              placeholder="******"
              {
                ...register("password",{
                  required:true
                })
              }
            />
            {errors.password && <span>Password is required.</span>}
          </p>
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-md px-2 py-2 
         font-semibold text-white"
          >
            {
              loading ? ('Loading...') : ('Sign In')
            }
          </button>
          <OAuth text={"Continue with Google"}/>
          <div className="flex gap-2">
            <span>{`Don't`} have an account?</span>
            <NavLink to="/sign-up" className="text-blue-700">
              Sign Up
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signin;
