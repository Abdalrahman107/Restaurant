import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../../Context/AuthContext";

const RequireLogin = ({ children, allowedRoles = [] }) => {
  const { token } = useContext(authContext);
  const userRole = localStorage.getItem("role");

    const isAllowed = token && allowedRoles.includes(userRole);

  if (!isAllowed ) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Please log in to view this content.
        </h2>
        <Link
          to={"/auth"}
          className="mt-4 main-bg-color hover:bg-red-700 text-white font-medium py-2 px-6 rounded-full transition">
          Go to Login
        </Link>
      </div>
    );
  }

  return children;
};

export default RequireLogin;
