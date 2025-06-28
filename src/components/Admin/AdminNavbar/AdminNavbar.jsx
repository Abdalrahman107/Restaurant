import { useContext, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import DarkLightIcon from "../../Utils/DarkLightIcon/DarkLightIcon";
import img from "../../../assets/images/avatar.png";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { authContext } from "../../../Context/AuthContext";

const AdminNavbar = ({ setOpenSidebar, openSidebar }) => {
  const [userIcon, setUserIcon] = useState(false);
  const { token, setToken } = useContext(authContext);
  const location = useLocation();
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("toky");
    localStorage.removeItem("role");
    setToken(null);
    navigate("/auth");
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-700 w-full shadow-lg dark:text-white">
      <div className="min-w-full py-2 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-4 ">
            {openSidebar ? (
              <AiOutlineMenuFold
                onClick={() => setOpenSidebar(!openSidebar)}
                className="text-[40px] transition-all cursor-pointer hover:bg-gray-200 p-1.5 rounded-full"
              />
            ) : (
              <AiOutlineMenuUnfold
                onClick={() => setOpenSidebar(!openSidebar)}
                className="text-[40px] transition-all cursor-pointer hover:bg-gray-200 p-1.5 rounded-full"
              />
            )}
          </div>

          <div className="flex items-center gap-x-3">
            <DarkLightIcon />

            {token && (role === "admin" || role === "superadmin") ? (
              <div className="relative">
                <button
                  onClick={() => setUserIcon(!userIcon)}
                  className="relative cursor-pointer flex text-sm bg-gray-800 rounded-full md:me-0"
                  type="button">
                  <span className="sr-only">Open user menu</span>
                  <img className="w-8 h-8 rounded-full" src={img} alt="user photo" />
                  <span className="absolute bg-white text-black rounded-full bottom-0 right-0">
                    <MdOutlineKeyboardArrowDown className="" />
                  </span>
                </button>
                {/* Dropdown menu */}
                {userIcon && (
                  <div className="z-10 absolute right-0 top-full mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <div className="py-2">
                      <button
                        onClick={handleSignOut}
                        className="block w-full cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              location.pathname !== "/" && (
                <button
                  onClick={() => navigate("/auth")}
                  className="ml-2 cursor-pointer text-sm bg-red-700 hover:bg-red-600 text-white font-medium py-1 px-2 rounded transition">
                  Sign In
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
