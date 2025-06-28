import React, { useEffect } from "react";
import { FaRegMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

const DarkLightIcon = () => {
  useEffect(() => {
    const darkIcon = document.getElementById("theme-toggle-dark-icon");
    const lightIcon = document.getElementById("theme-toggle-light-icon");
    const toggleBtn = document.getElementById("theme-toggle");

    if (!toggleBtn) return;
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      lightIcon?.classList.remove("hidden");
    } else {
      document.documentElement.classList.remove("dark");
      darkIcon?.classList.remove("hidden");
    }

    const toggleTheme = () => {
      darkIcon?.classList.toggle("hidden");
      lightIcon?.classList.toggle("hidden");

      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      }
    };

    toggleBtn.addEventListener("click", toggleTheme);

    return () => {
      toggleBtn.removeEventListener("click", toggleTheme);
    };
  }, []);

  return (
    <button
      id="theme-toggle"
      type="button"
      className=" dark:text-white focus:outline-none w-8 h-8 flex justify-center items-center hover:bg-gray-200 dark:hover:bg-gray-400 rounded-full cursor-pointer transition-colors duration-500">
      <span id="theme-toggle-light-icon" className="hidden text-lg">
        <IoSunnyOutline />
      </span>
      <span id="theme-toggle-dark-icon" className="hidden text-lg">
        <FaRegMoon />
      </span>
    </button>
  );
};

export default DarkLightIcon;
