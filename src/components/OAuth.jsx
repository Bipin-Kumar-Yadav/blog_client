import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { AiFillGoogleCircle } from "react-icons/ai"
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoading, signin } from '../redux/userSlice/user';
const OAuth = ({text}) => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async() =>{
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt : 'select_account'});
    try{
      const resultsFromGoogle = await signInWithPopup(auth,provider);
      dispatch(setLoading(true))
      const res = await fetch('/api/auth/google',{
        method:'POST',
        headers : {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          name : resultsFromGoogle.user.displayName,
          email : resultsFromGoogle.user.email,
          photoUrl : resultsFromGoogle.user.photoURL,
        })
      })
      const data = res.json();
      dispatch(setLoading(false))
      if(res.ok){
          dispatch(signin(data));
          navigate('/')
      }
      else{
        navigate('/sing-in')
      }
    }catch(error){
      console.log("Frontend error in OAuth")
    }
  }

  return (
    <button type="button" 
    onClick={handleGoogleClick}
    className=" hover:bg-gradient-to-r from-pink-700 via-purple-600 to-blue-600 hover:text-white  outline-none border-2 border-blue-900 rounded-md flex items-center justify-center py-2 gap-2">
      <AiFillGoogleCircle className="text-2xl"/>
      <span className="text-semibold ">{text}</span>
    </button>
  )
}

export default OAuth
