import { MdOutlineFastfood } from "react-icons/md";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import DarkLightIcon from "../../Utils/DarkLightIcon/DarkLightIcon";
const AuthNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <nav className="border-gray-200 text-white bg-[rgba(0,0,0,0.7)]  dark:bg-gray-700 sticky top-0 z-40 shadow-lg">
        <div className="w-[95%] mx-auto">
          <div className="flex flex-wrap items-center">
            <Link to={"/"} className="flex items-center space-x-3 rtl:space-x-reverse py-2">
              <MdOutlineFastfood className="text-xl sm:text-3xl main-color" />
              <span className="f-nunito font-extrabold self-center text-lg sm:text-xl dark:text-white mr-2">
                Yummy<span className="main-color">Yum</span>
              </span>
            </Link>
            <ul className="flex flex-col items-center font-medium p-4 md:p-0 md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={`block py-2 px-3 md:p-0  dark:text-white hover:text-[#e52b34]`}
                  aria-current="page">
                  Home
                </NavLink>
              </li>
            </ul>
            <div className="ml-auto flex items-center gap-x-2">
              <DarkLightIcon />

              {location.pathname === "/auth/register" && (
                <button
                  onClick={() => navigate("/auth")}
                  className="ml-2 cursor-pointer text-sm bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-2 rounded transition">
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AuthNavbar;
