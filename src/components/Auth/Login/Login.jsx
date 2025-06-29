import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import img from "../../../assets/images/signin.jpg";
import { SiIfood } from "react-icons/si";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { authContext } from "../../../Context/AuthContext";
export default function Login() {
  const { setToken } = useContext(authContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const login = (values) => {
    axios
      .post("https://yumyum-server-six.vercel.app/users/login", values)
      .then((res) => {
        if (!res.data.token || !res.data.role) {
          toast.error("Invalid response from server");
          return;
        }

        const newToken = res.data.token;
        const finalToken = `ymym__${newToken}`;
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("toky", finalToken);
        setToken(finalToken);
        toast.success("success");
        if (res.data.role === "admin" || res.data.role === "superadmin") {
          setTimeout(() => navigate("/admin"), 500);
        } else {
          setTimeout(() => navigate("/"), 500);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.err || err?.response?.data || "Login failed");
      });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      const finalToken = `ymym__${token}`;
      localStorage.setItem("toky", finalToken);
      localStorage.setItem("role", "user");
      setToken(finalToken);
      toast.success("success");
      navigate("/");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().email("Please enter a Valid Mail").required("Input is Required"),
      password: Yup.string()
        .trim()
        .required("Password is required")
        .min(6, "Minimum 6 characters required")
        .max(16, "Maximum 16 characters allowed"),
    }),
    onSubmit: (values) => login(values),
  });

  return (
    <div
      className="flex items-center justify-center min-h-[80vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${img})` }}>
      <div className="w-full max-w-sm bg-[rgba(0,0,0,0.5)] p-8 rounded-2xl shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-center mb-8 flex gap-x-2 justify-center">
          Login <SiIfood className="main-color text-4xl" />
        </h2>

        <div className="space-y-4">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
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
              Log In
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm text-white">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/auth/register")}
                className="text-red-400 hover:underline font-medium cursor-pointer">
                Register
              </button>
            </p>
          </div>

          <div className="relative my-4 text-center text-gray-600 text-sm">
            <span className="px-2 bg-white z-10 relative">OR</span>
            <hr className="absolute top-1/2 left-0 w-full border-t border-gray-300 transform -translate-y-1/2" />
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.href = "https://yumyum-server-six.vercel.app/auth/google";
            }}
            className="cursor-pointer flex items-center justify-center gap-3 w-full py-2 bg-white border border-gray-300  text-gray-800 hover:bg-gray-100 rounded-lg transition">
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>

          <div className="mt-2">
            <button
              type="button"
              onClick={() => navigate("/auth/forgetpassword")}
              className="cursor-pointer text-sm text-blue-300 hover:underline">
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
