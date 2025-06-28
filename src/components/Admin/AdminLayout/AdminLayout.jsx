import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Sidebar from "../Sidebar/Sidebar";
import RequireLogin from "../../Utils/RequiredLogin/RequiredLogin";
import AdminFooter from "../AdminFooter/AdminFooter";
import ScrollToTop from "../../Utils/ScrollToTop/ScrollToTop";


const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      <ScrollToTop/>
      <RequireLogin allowedRoles={["admin", "superadmin"]}>
        <div className="min-h-screen">
          <div className={`${openSidebar ? "ml-0" : " -ml-[250px] "} transition-all duration-500`}>
            <Sidebar setOpenSidebar={setOpenSidebar} />
          </div>
          <div className={`${!openSidebar ? "ml-0" : " ml-[250px] "} transition-all duration-500`}>
            <AdminNavbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
            <Outlet />
          </div>
        </div>
      <AdminFooter/>
      </RequireLogin>
    </>
  );
};

export default AdminLayout;
