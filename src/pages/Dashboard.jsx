import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div
      className="flex w-full "
      id="dashboard"
    >
      <Sidebar id="sidebar_container" />
      <div id="outlet_container" className=" w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
