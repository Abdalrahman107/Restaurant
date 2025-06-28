import React from "react";
import { MdOutlineFastfood } from "react-icons/md";
import { RiMenuLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";

const Sidebar = ({ setOpenSidebar }) => {
  const role = localStorage.getItem("role");

  return (
    <div className="min-h-screen bg-gray-700 dark:bg-gray-500 text-white w-[250px] fixed z-40 py-2 px-2">
      <Link to={"/admin"} className="p-4 mb-8 flex items-center space-x-3 rtl:space-x-reverse py-2">
        <MdOutlineFastfood className="text-xl sm:text-3xl main-color" />
        <span className="f-nunito font-extrabold self-center text-lg sm:text-xl dark:text-white">
          Yummy<span className="main-color">Yum</span>
        </span>
      </Link>
      <ul className={`flex  flex-col flex-wrap justify-center md:justify-start gap-y-8 text-lg`}>
        {role === "admin" && (
          <li>
            <NavLink onClick={() => setOpenSidebar(false)} to="categories" end className={"p-4 dashboard-sidebar-menu"}>
              Categories
            </NavLink>
          </li>
        )}
        {role === "admin" && (
          <li>
            <NavLink onClick={() => setOpenSidebar(false)} to="foods" end className={"p-4 dashboard-sidebar-menu"}>
              Foods
            </NavLink>
          </li>
        )}
        {role === "admin" && (
          <li>
            <NavLink onClick={() => setOpenSidebar(false)} to="branches" end className={"p-4 dashboard-sidebar-menu"}>
              Branches
            </NavLink>
          </li>
        )}
        {role === "admin" && (
          <li>
            <NavLink
              onClick={() => setOpenSidebar(false)}
              to="tables"
              end
              className={"p-4 dashboard-sidebar-menu"}>
              Tables
            </NavLink>
          </li>
        )}
        {role === "admin" && (
          <li>
            <NavLink
              onClick={() => setOpenSidebar(false)}
              to="orders"
              end
              className={"p-4 dashboard-sidebar-menu"}>
              Orders
            </NavLink>
          </li>
        )}
        {role === "superadmin" && (
          <li>
            <NavLink onClick={() => setOpenSidebar(false)} to="users" end className={"p-4 dashboard-sidebar-menu"}>
              Manage Users
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
