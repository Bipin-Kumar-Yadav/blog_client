import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
const CreatePost = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [content,setContent] = useState('');
  const editorRef = useRef(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  if (!currentUser.isAdmin) {
    return <Navigate to={"/dashboard/profile"} />;
  }
  const options = [
    {
      id: 1,
      value: "Select a category",
    },
    {
      id: 2,
      value: "Javascript",
    },
    {
      id: 3,
      value: "ReactJs",
    },
    {
      id: 4,
      value: "NodeJs",
    },
  ];
  const formSubmit=(data)=>{
    data.content = content;
    console.log(data)
    setContent('')
    reset();
  }
  return (
    <div className="flex flex-col w-full items-center mt-8" id="createPost">
      <h1 className="text-xl md:text-2xl font-semibold">Create a Post</h1>
      <form
        onSubmit={handleSubmit(formSubmit)}
       className="flex flex-col w-full  mt-5 items-center mr-1 md:mr-0 mb-10">
        <input
          type="text"
          placeholder="Title"
          className=" outline-none w-[80%] max-w-md border-2 rounded-md placeholder:text-gray-600 px-1 py-1 bg-transparent "
          {...register("title", {
            required: true,
          })}
        />
        {errors.title && <span>Title is required</span>}
        <select
          className=" outline-none mt-3 w-[80%] max-w-md border-2 rounded-md placeholder:text-gray-600 px-1 py-1 bg-transparent "
          {...register("categories")}
        >
          {options?.map((val) => (
            <option key={val.id} value={val.value}>
              {val.value}
            </option>
          ))}
        </select>
        <div className="flex flex-col md:flex-row w-[90%] md:w-[445px] rounded-md mx-auto border-blue-700 mt-3 border-2 border-dotted px-2 py-2">
          <input type="file" accept="image/*" {...register("image")} />
          <button
            type="button"
            className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-md px-1 py-1 md:px-2 md:py-2 
         font-semibold text-white mt-2 md:mt-0"
          >
            Upload Image    
          </button>
          
        </div>
          <div className="flex justify-center">
          <JoditEditor
              ref={editorRef}
              value={content}
              onChange={(newContent)=> setContent(newContent)}
            />
          </div>

            <button className="bg-gradient-to-r  from-blue-500 via-purple-500 w-[95%] max-w-md to-pink-500 rounded-md px-1 py-1 md:px-2 md:py-2 
         font-semibold text-white md:mt-0" type="submit">Publish</button>
      </form>
    </div>
  );
};

export default CreatePost;
