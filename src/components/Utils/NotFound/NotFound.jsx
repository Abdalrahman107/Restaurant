import { Link } from "react-router-dom";
import img from "../../../assets/images/404.jpg"

const NotFound = () => {
  const role = localStorage.getItem('role')
  return <div className="flex flex-col justify-center sm:items-center min-h-screen">
    <img className="md:w-1/2" src={img} alt="404 notfound page" />
    <Link to={role === "admin"?"/admin":"/"} className="main-bg-color text-white px-4 py-1 rounded-full ml-auto mb-6">Back to home</Link>
  </div>;
};

export default NotFound;
