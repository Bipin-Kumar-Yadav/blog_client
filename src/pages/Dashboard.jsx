import { Outlet} from "react-router-dom"
import Sidebar from "../components/Sidebar"

const Dashboard = () => {
  return (
    <div className="h-screen bg-primary flex ">
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default Dashboard
