import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-[#020812] text-[#F5F7FA]">
      <Sidebar />

      <div className="min-h-screen pl-[248px]">
        <Topbar />

        <main className="min-h-screen pt-[72px]">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;