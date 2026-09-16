import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

function MainLayout() {
  return (
    <div>
      <Sidebar />

      <div>
        <Topbar />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;