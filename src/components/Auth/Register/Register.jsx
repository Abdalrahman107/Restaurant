import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img from "../../../assets/images/signin.jpg";
import { SiIfood } from "react-icons/si";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const register = async (values) => {
    try {
      await axios.post("https://yumyum-server-six.vercel.app/users/admin", values);
      toast.success("success");
      setTimeout(() => navigate("/auth"), 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.err || err?.response?.data || "signup failed");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required("Input is Required").min(2, "Minimum 2 characters required")
        .max(16, "Maximum 16 characters allowed"),
      email: Yup.string().trim().email("Please enter a Valid Mail").required("Input is Required"),
      password: Yup.string()
        .trim()
        .required("Password is required")
        .min(6, "Minimum 6 characters required")
        .max(16, "Maximum 16 characters allowed"),
    }),
    onSubmit: (values) => register(values),
  });

  return (
    <div
      className="flex items-center justify-center min-h-[80vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${img})` }}>
      <div className="w-full max-w-sm bg-[rgba(0,0,0,0.5)] p-8 rounded-2xl shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-center mb-8 flex gap-x-2 justify-center">
          Register <SiIfood className="main-color text-4xl" />
        </h2>

        <div className="space-y-4">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              type="text"
              name="name"
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300"
            />

            {formik.touched.name && formik.errors.name ? (
              <div className="text-sm text-red-400" role="alert">
                {formik.errors.name}
              </div>
            ) : null}
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300"
            />

            {formik.touched.email && formik.errors.email ? (
              <div className="text-sm text-red-400" role="alert">
                {formik.errors.email}
              </div>
            ) : null}
            <div className="relative mb-4">
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300"
              />

              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/3 cursor-pointer text-gray-500">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {formik.touched.password && formik.errors.password ? (
              <div className="my-4 text-sm text-red-400 rounded-lg " role="alert">
                {formik.errors.password}
              </div>
            ) : null}

            <button
              type="submit"
              className="cursor-pointer w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
