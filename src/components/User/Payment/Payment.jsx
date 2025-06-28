import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";
import useOrdersApi from "../../../apiHooks/useOrdersApi";
import { cartContext } from "../../../Context/CartCotext";
import { useContext } from "react";

const Payment = () => {

  const { cartData:cartItems } = useContext(cartContext);

  const queryClient = useQueryClient();
  const { createOrder } = useOrdersApi();

  const CreateOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.err || err?.response?.data || "Something went wrong");
    },
  });

  const createNewOrder = CreateOrderMutation.mutateAsync;

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      paymentmethod: "cash",
      address: "",
      phone: "",
    },
    validationSchema: Yup.object({
      paymentmethod: Yup.string().required(),
      address: Yup.string().trim().required("Address is required"),
      phone: Yup.string()
        .trim()
        .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
        .required("Phone is required"),
    }),
    onSubmit: async (values) => {
        if (values.paymentmethod === "cash") {
          await createNewOrder(values);
          toast.success("success");
          navigate("/orders");
        } else if (values.paymentmethod === "card") {
          const res = await createNewOrder(values);
          toast.success("success");
          window.open(res.url, "_blank");
          navigate("/");
        }
    },
  });

  return (
    <div className="bg-neutral-50 dark:bg-gray-900 min-h-screen">
      <div className="w-[95%] mx-auto grid grid-cols-3 text-center gap-6 py-7">
        {/* Payment Form */}

        <form
          onSubmit={formik.handleSubmit}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md space-y-6 col-span-3 md:col-span-2 text-left">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Payment Details</h2>

          {/* Payment Method */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Payment Method</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer ">
                <input
                  type="radio"
                  name="paymentmethod"
                  value="cash"
                  checked={formik.values.paymentmethod === "cash"}
                  onChange={formik.handleChange}
                  className="accent-blue-600"
                />
                <span className="text-gray-700 dark:text-gray-300">Cash</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer ">
                <input
                  type="radio"
                  name="paymentmethod"
                  value="card"
                  checked={formik.values.paymentmethod === "card"}
                  onChange={formik.handleChange}
                  className="accent-blue-600"
                />
                <span className="text-gray-700 dark:text-gray-300">Card</span>
              </label>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
            <input
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none  dark:bg-gray-700 dark:text-white border-gray-200 focus:border-gray-400 dark:border-gray-700 dark:focus:border-gray-500"
              placeholder="Enter delivery address"
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-800 text-sm mt-1">{formik.errors.address}</div>
            ) : null}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white border-gray-200 focus:border-gray-400 dark:border-gray-700 dark:focus:border-gray-500"
              placeholder="e.g. 01012345678"
            />

            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-800 text-sm mt-1">{formik.errors.phone}</div>
            ) : null}
          </div>
        </form>

        {/* Order Summary */}
        <div className="col-span-3 md:col-span-1 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Order Summary</h2>

          <ul className="text-left text-gray-700 dark:text-gray-300 space-y-2">
            <li className="flex justify-between">
              <span>Cart total:</span>
              <span>${(cartItems?.totalCartPrice)?.toFixed(2)}</span>
            </li>
            <li className="flex justify-between">
              <span>Delivery fees:</span>
              <span>$30.00</span>
            </li>
            <li className="flex justify-between font-bold pt-2 border-t border-gray-300">
              <span>Total</span>
              <span>${(cartItems?.totalCartPrice + 30).toFixed(2)}</span>
            </li>
          </ul>

          <button
            type="submit"
            onClick={formik.handleSubmit}
            className={` cursor-pointer block text-center w-full mt-6 font-semibold py-2 rounded-lg transition ${
              formik.isValid
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}>
            {formik.isSubmitting ? (
              <ImSpinner9 className=" animate-spin text-xl text-white mx-auto" />
            ) : (
              "Confirm Order"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
