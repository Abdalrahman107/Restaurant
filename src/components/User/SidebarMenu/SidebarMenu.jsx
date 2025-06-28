import { IoMdCloseCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import useMenuApi from "../../../apiHooks/useMenuApi";

const SidebarMenu = ({ open, onClose }) => {
  const { getFoodCategories } = useMenuApi();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getFoodCategories,
  });

  const categories = data?.categories;

  if (isError) {
    return (
      <div className="py-6 text-center">
        <p className="text-red-400">{ error?.response?.data?.err || error?.response?.data || "Could not load Categories."}</p>
      </div>
    );
  }

  return (
    <div>
      <div
        id="sidebar"
        className={`fixed top-0 left-0 w-64 h-screen overflow-y-auto transition-transform duration-500 ${
          open ? "translate-x-0" : "-translate-x-full"
        } bg-white dark:bg-gray-800 z-50 dark:text-gray-400`}>
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-600 p-4">
          <h5 className="text-base font-semibold text-gray-500 uppercase ">Menu</h5>
          <button
            onClick={onClose}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 flex items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
            <IoMdCloseCircle className="text-2xl" />
          </button>
        </div>
        <div className="py-4 overflow-y-auto px-4">
          <div className="my-7 ">
            {isLoading ? (
              <ImSpinner9 className="animate-spin text-4xl main-color mx-auto" />
            ) : (
              <ul className={`flex flex-col flex-wrap justify-center md:justify-start gap-y-8`}>
                <li>
                  {" "}
                  <NavLink onClick={onClose} to="" end className={"p-4 menu-item"}>
                    Offers
                  </NavLink>
                </li>
                {categories?.map((category) => {
                  return (
                    <li key={category._id}>
                      {" "}
                      <NavLink onClick={onClose} to={category._id} end className={"p-4 menu-item"}>
                        {category.name}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
