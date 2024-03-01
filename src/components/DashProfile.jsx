import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {getDownloadURL, getStorage,ref,uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import { setLoading, signout, updateUser } from "../redux/userSlice/user";

const DashProfile = () => {
  const {register,handleSubmit,reset} = useForm();
  const [imageFile ,setImageFile]  = useState(null)
  const [imgFileUrl,setImgFileUrl]  = useState(null);
  const [imgDownloadUrl, setImgDownloadUrl] = useState(null)
  const loading = useSelector((state)=>state.user.loading)
  const fileRef = useRef();
  const dispatch = useDispatch();
  const currentUser = useSelector((state)=>state.user.currentUser);
  const handleForm = async(data) =>{
    if(imgDownloadUrl){
      data.profilePicture =imgDownloadUrl
    }
    if(data.length === 0 ) return;
    if(data.password === ''){
      data.password = null
    }
   try {
    dispatch(setLoading(true));
     const res = await fetch("/api/user/updateUser",{
       method:'PUT',
       headers: {
         'Content-Type': 'application/json',
       },
       body : JSON.stringify(data)
     }) 
     const resData = await res.json();
     console.log(resData.user);
     dispatch(updateUser(resData.user))
     dispatch(setLoading(false));
     reset();
   } catch (error) {
    console.log("Frontend Error while updating user",error)
   }
  }
  const handleImageUpload = (e) =>{
    const file = e.target.files[0];
    if(file){
      setImageFile(file);
      setImgFileUrl(URL.createObjectURL(file))
    }
  }
  const imageUpload = async()=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on('state_changed',(snapshot)=> {
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
      console.log(progress);
    },
    (error)=>{
      console.log(error)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{setImgFileUrl(downloadURL)
        setImgDownloadUrl(downloadURL);
      })
    }
    )
  }
  const handleDelete = async()=>{
   try {
     dispatch(setLoading(true));
     const res = await fetch('/api/user/deleteUser',{
       method : 'GET',
       headers: {
         'Content-Type': 'application/json',
       }
     }
     )
     dispatch(setLoading(false))
     dispatch(signout())
     console.log(res)
   } catch (error) {
    console.log("Frontend error while deleting user",error)
   }
  }
  useEffect(()=>{
    if(imageFile){
      imageUpload();
    }
  },[imageFile])
  return (
    <div className=" w-full md:w-[40%] mx-auto p-3">
        <form onSubmit={handleSubmit(handleForm)} className="flex flex-col w-full">
        <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            hidden
            ref={fileRef}
            // {
            //   ...register("profilePicture")
            // }
          />
            <div className=" w-32 h-32 rounded-full self-center cursor-pointer shadow-lg" onClick={()=>fileRef.current.click()}>
                <img src={imgFileUrl || currentUser?.profilePicture} alt="profile" className=" border-8 rounded-full h-full w-full object-cover"/>
            </div>
            <input
              type="text"
              placeholder="username"
              defaultValue={currentUser?.username}
              {...register("username")}
              className="mt-3  outline-none px-2 py-2 border-2 font-semibold text-base md:text-lg rounded-md bg-transparent"
            />
            <input
              type="text"
              placeholder="email"
              defaultValue={currentUser?.email}
              {...register("email")}
              className="mt-3  outline-none px-2 py-2 border-2 font-semibold text-base md:text-lg rounded-md bg-transparent"
            />
            <input
              type="password"
              placeholder="password"
              {
                ...register("password")
              }
              className="mt-3  outline-none px-2 py-2 border-2 font-semibold text-base md:text-lg rounded-md bg-transparent placeholder:text-gray-600"
            />
            <button type="submit" className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-md px-2 py-2 mt-3 
         font-semibold text-white">{loading ? "Loading..." : "Update"}</button>
        </form>
        <p onClick={handleDelete} className=" cursor-pointer text-base md:text-lg mt-3 font-semibold text-red-500">Delete Account</p>
    </div>
  )
}

export default DashProfile
