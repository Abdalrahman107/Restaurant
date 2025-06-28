import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const login = (values) => {
    axios
      .put("https://yumyum-server-six.vercel.app/users/admin/reset", values)
      .then(() => {
        toast.success("Success");
        navigate("/auth");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.err || err?.response?.data || "Login failed");
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      code: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().email("Please enter a Valid Mail").required("Input is Required"),
      password: Yup.string().trim().required("Input is Required"),
      code: Yup.string().trim().required("Input is Required"),
    }),
    onSubmit: (values) => login(values),
  });
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <div className="flex items-center justify-center min-h-[80vh] bg-cover bg-center">
        <div className="w-full max-w-sm  p-8 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-8 flex gap-x-2 justify-center">Reset Password</h2>

          <div className="space-y-4">
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                name="email"
                placeholder="please enter your Email"
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

              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                type="text"
                name="code"
                placeholder="code"
                className="w-full px-4 py-2 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300"
              />

              {formik.touched.code && formik.errors.code ? (
                <div className="text-sm text-red-400" role="alert">
                  {formik.errors.code}
                </div>
              ) : null}

              <button
                type="submit"
                className="cursor-pointer w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
