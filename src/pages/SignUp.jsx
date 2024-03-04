import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data) =>{
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup',{
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      })
      setLoading(false);
      reset();
      if(res.ok){
        navigate('/sign-in')
      }
      else{
        navigate("/sign-out")
      }
      console.log(res);
      
    } catch (error) {
      console.log("error in frontend while signup")
      navigate('/sign-out')
    }
  }

  return (
    <div className="bg-primary  mx-auto max-w-3xl flex flex-col md:flex-row  justify-between ">
    <div className="mt-5 md:mt-[25%] md:w-[45%] ml-2">
     <div className="flex gap-2 w-fit  mx-auto">
     <span
        className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2 py-1
               rounded-md text-4xl text-white 
               font-bold"
      >{`Bipin's`}</span>
      <span className="font-bold text-4xl text-blue-900">Blog</span>
     </div>
      <p className="mt-2 text-slate-900">
        This is a demo project. You can sign up with your email and password.
      </p>
    </div>
    <div className="ml-2 mr-2 h-full mt-2 md:mt-[15%] md:w-[45%]">
      <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-4">
      <p className="flex flex-col">
          Your username:
          <input
          type="text"
            className=" outline-none  bg-gray-200 border-1 rounded-md px-2 py-2"
            placeholder="username..."
            {...register("username",{
              required:true,
            })}
          />
          {errors.username && <span>Username is required</span>}
        </p>
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
          {errors.email && <span>Email is required</span>}
        </p>
        <p className="flex flex-col">
          Your password:
          <input
          type="password"
            className=" outline-none  bg-gray-200 border-1 rounded-md px-2 py-2"
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
            disabled={loading}
        >
          {loading ? ('loading...'):('Sign Up')}
        </button>
        <OAuth text={"Sign Up with Google"}/>
        <div className="flex gap-2">
          <span>Already have an account?</span>
          <NavLink to="/sign-in" className="text-blue-700">
            Sign In
          </NavLink>
        </div>
      </form>
    </div>
  </div>
  )
}

export default SignUp
