import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="bg-primary h-screen mx-auto max-w-3xl flex flex-col md:flex-row  justify-between">
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
        This is a demo project. You can sign up with your email and password.
      </p>
    </div>
    <div className="ml-2 mr-2 h-full mt-[15%] md:w-[45%]">
      <form className="flex flex-col gap-4">
      <p className="flex flex-col">
          Your username:
          <input
          type="text"
            className=" outline-none  bg-gray-200 border-1 rounded-md px-2 py-2"
            placeholder="username..."
          />
        </p>
        <p className="flex flex-col">
          Your Email:
          <input
          type="text"
            className=" outline-none  bg-gray-200 border-1 rounded-md px-2 py-2"
            placeholder="name@company.com"
          />
        </p>
        <p className="flex flex-col">
          Your Password:
          <input
          type="password"
            className=" outline-none  bg-gray-200 border-1 rounded-md px-2 py-2"
            placeholder="******"
          />
        </p>
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-md px-2 py-2 
       font-semibold text-white"
        >
          Sign Up
        </button>
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
