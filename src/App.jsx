import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from './pages/SignIn';
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import DashPosts from "./components/DashPosts";
import DashProfile from "./components/DashProfile";
import DashComment from "./components/DashComment";
import DashUser from "./components/DashUser";
import DashBoard from "./components/DashBoard";
const App = () =>{

  return (
    <div className="bg-primary">
    <BrowserRouter>
        <Header/>
        <Routes>
          <Route  path='/' element={<Home/>}/>
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/dashboard" element={<Dashboard/>}>
              <Route path="profile"  element={<DashProfile/>}/>
              <Route path="comments" element={<DashComment/>} />
              <Route path="posts" element={<DashPosts/>} />
              <Route path ="users" element={<DashUser/>} />
              <Route path="dash" element={<DashBoard/>} /> 
          </Route>
        </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App;