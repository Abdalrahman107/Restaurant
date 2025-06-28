import { CiClock2 } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaLocationDot, FaTwitter, FaYoutube } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#F5F5F5] dark:bg-gray-800 dark:text-white">
      <div className="w-[95%] mx-auto flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="w-full sm:w-1/3 p-4">
          <h2 className="f-nunito text-lg font-bold">
            Yummy<span className="main-color">Yum</span>
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-4">
            Satisfy your cravings with bold flavors, crispy bites, and lightning-fast service. Your go-to spot for
            mouthwatering burgers, fries, and all your fast food favorites
          </p>
        </div>
        <div className="w-full sm:w-1/3 p-4">
          <h2 className="f-nunito text-lg font-bold">Openning hours</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 flex items-center gap-x-3">
            <CiClock2 className="text-gray-600 text-2xl" />
            Monday - Friday: 11:00 AM - 10:00 PM
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 flex items-center gap-x-3">
            <CiClock2 className="text-gray-600 text-2xl" />
            Saturday - Sunday: 10:00 AM - 11:00 PM
          </p>
        </div>
        <div className="w-full sm:w-1/3 p-4">
          <h2 className="f-nunito text-lg font-bold">Contact Us</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 flex items-center gap-x-3">
            <IoCall className="text-gray-600 text-xl" />
            9999
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 flex items-center gap-x-3">
            <IoMdMail className="text-gray-600 text-xl" />
            info@yummy.com
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 flex items-center gap-x-3">
            <FaLocationDot className="text-gray-600 text-xl" />
            123 great Street, Yummy City, FC 12345
          </p>
          <div className="mt-3 flex items-center gap-x-4">
            <Link to="https://www.facebook.com/" target="_blank">
              <FaFacebook className="text-gray-600 text-2xl cursor-pointer hover:text-blue-500 transition-colors duration-500" />
            </Link>
            <Link to="https://www.youtube.com/" target="_blank">
              <FaYoutube className="text-gray-600 text-2xl cursor-pointer hover:text-red-500 transition-colors duration-500" />
            </Link>
            <Link to="https://twitter.com/" target="_blank">
              <FaTwitter className="text-gray-600 text-2xl cursor-pointer hover:text-sky-500 transition-colors duration-500" />
            </Link>
            <Link to="https://www.instagram.com/" target="_blank">
              <FaInstagram className="text-gray-600 text-2xl cursor-pointer hover:text-red-500 transition-colors duration-500" />
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center py-4 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-300 dark:border-gray-600">
        © 2025 YummuYum. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
