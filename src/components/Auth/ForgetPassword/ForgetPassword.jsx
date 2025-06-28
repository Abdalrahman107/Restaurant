import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const login = (values) => {
    axios
      .put("https://yumyum-server-six.vercel.app/users/admin", values)
      .then(() => {
        toast.success("Request sent!, Please Check your mail for reset code", {
          duration: 3000,
        });
        navigate("/auth/resetpassword");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.err || err?.response?.data || "Login failed");
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().email("Please enter a Valid Mail").required("Input is Required"),
    }),
    onSubmit: (values) => login(values),
  });
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <div className="flex items-center justify-center min-h-[80vh] bg-cover bg-center">
        <div className="w-full max-w-sm  p-8 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-8 flex gap-x-2 justify-center">Forget Password</h2>

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

export default ForgetPassword;
