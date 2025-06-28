import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import SidebarMenu from "../SidebarMenu/SidebarMenu";

const Menu = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className=" bg-neutral-50 dark:bg-gray-900 dark:text-white py-7 min-h-screen">
      <div className="w-[95%] mx-auto">
        <div className="header flex items-center justify-center relative after:absolute after:w-20 after:h-1 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-[#e52b34] mb-7">
          <h2 className="f-danc text-6xl font-extrabold text-center p-4">Our Menu</h2>
        </div>

        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="transition-all duration-500 absolute top-0 left-0  animate__animated animate__slideInLeft mt-40 sm:mt-34 text-white cursor-pointer bg-[#e52b34]  font-medium rounded-r-full text-sm sm:text-xl p-2 text-center flex items-center gap-x-7 ">
          Categories <FaArrowRight className="text-xl animate__animated animate__slideInLeft animate__infinite" />
        </button>

        <SidebarMenu open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <Outlet />
      </div>
    </div>
  );
};

export default Menu;
