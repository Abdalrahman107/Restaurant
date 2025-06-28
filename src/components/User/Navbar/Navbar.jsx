import { useContext } from "react";
import { MdOutlineFastfood, MdShoppingCartCheckout } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TfiMenuAlt } from "react-icons/tfi";
import DarkLightIcon from "../../Utils/DarkLightIcon/DarkLightIcon";
import { authContext } from "../../../Context/AuthContext";
import { cartContext } from "../../../Context/CartCotext";

const Navbar = () => {
  const { token, setToken } = useContext(authContext);
  const { cartData:cartItems } = useContext(cartContext);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("toky");
    localStorage.removeItem("role");
    setToken(null);
    navigate("/auth");

    const url = new URL(window.location.href);
    url.searchParams.delete("token");
    window.history.replaceState({}, document.title, url.pathname);

    window.location.reload();
  };

  const toggleNavbarMenu = () => {
    const menu = document.getElementById("navbarMenu");
    menu.classList.toggle("hidden");
    menu.classList.toggle("bg-[rgba(0,0,0,0.4)]");
    menu.classList.toggle("dark:bg-gray-800");
  };

  return (
    <>
      <nav className="border-gray-200 text-white bg-[rgba(0,0,0,0.7)]  dark:bg-gray-700 sticky top-0 z-40 shadow-lg">
        <div className="w-[95%] mx-auto">
          <div className="flex flex-wrap items-center justify-between">
            <Link to={"/"} className="flex items-center space-x-3 rtl:space-x-reverse py-2">
              <MdOutlineFastfood className="text-xl sm:text-3xl main-color" />
              <span className="f-nunito font-extrabold self-center text-lg sm:text-xl dark:text-white">
                Yummy<span className="main-color">Yum</span>
              </span>
            </Link>
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse py-2">
              <DarkLightIcon />
              {token && role === "user" ? (
                <button
                  onClick={handleSignOut}
                  className="ml-2 cursor-pointer text-sm bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-2 rounded transition">
                  Sign Out
                </button>
              ) : (
                  <button
                    onClick={() => navigate("/auth")}
                    className="ml-2 cursor-pointer text-sm bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-2 rounded transition">
                    Sign In
                  </button>
                )}
              <button
                onClick={toggleNavbarMenu}
                type="button"
                className="cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 transition-colors duration-500"
                aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <TfiMenuAlt className="text-2xl text-white" />
              </button>
            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbarMenu">
              <ul className="flex flex-col items-center font-medium p-4 md:p-0 md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0">
                <li>
                  <NavLink
                    to=""
                    end
                    className={`block py-2 px-3 md:p-0  dark:text-white hover:text-[#e52b34]`}
                    aria-current="page">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="menu"
                    className={`block py-2 px-3 md:p-0  dark:text-white hover:text-[#e52b34]`}
                    aria-current="page">
                    Menu
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="reservation"
                    className="block py-2 px-3 md:p-0  dark:text-white hover:text-[#e52b34]">
                    Reservation
                  </NavLink>
                </li>
                <li>
                  <NavLink to="orders" end className="block py-2 px-3 md:p-0  dark:text-white hover:text-[#e52b34]">
                    Orders
                  </NavLink>
                </li>
                {token && role === "user" && (
                  <li>
                    <NavLink
                      to="cart"
                      className="relative py-2 px-3 text-white hover:text-[#e52b34] transition-all duration-300">
                      <MdShoppingCartCheckout className="text-3xl" />
                      {cartItems?.cart?.length >= 0 && (
                        <span className="absolute top-1/5 -right-[220%] main-bg-color w-5 h-5 flex items-center justify-center font-bold text-white bg-black rounded-full shadow-sm text-sm">
                          {cartItems.cart.length}
                        </span>
                      )}
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
