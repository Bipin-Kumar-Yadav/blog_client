import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import DashPosts from "./components/DashPosts";
import DashProfile from "./components/DashProfile";
import DashComment from "./components/DashComment";
import DashUser from "./components/DashUser";
import DashBoard from "./components/DashBoard";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
const App = () => {
  return (
    <BrowserRouter className="bg-primary flex flex-col" id="main">
      <Header />
      <Routes
        className="w-full bg-blue-500 flex justify-between"
        id="container"
      >
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="profile" element={<DashProfile />} />
            <Route path="comments" element={<DashComment />} />
            <Route path="posts" element={<DashPosts />} />
            <Route path="users" element={<DashUser />} />
            <Route path="dash" element={<DashBoard />} />
            <Route path="createPost" element={<CreatePost />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;

{
  /* <BrowserRouter>

<div className=" mt-[64px] overflow-y-hidden">
<Routes >
 
 
</Routes>
</div>
</BrowserRouter> */
}
