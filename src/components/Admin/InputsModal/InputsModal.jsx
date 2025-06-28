import { useFormik } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import * as Yup from "yup";

const InputsModal = ({ header, isModalOpen, closeModal, inputs = [], onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {};
  const validationShape = {};

  inputs.forEach((input) => {
    const name = input.label.toLowerCase();
    if (input.type === "file") {
      initialValues[name] = null;
    } else {
      initialValues[name] = input.defaultValue || "";
    }

    if (input.type === "file") {
      validationShape[name] = Yup.mixed().required(`${input.label} is required`);
    } else {
      validationShape[name] = Yup.string().trim().required(`${input.label} is required`);
    }
  });

  const validationSchema = Yup.object(validationShape);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const dataToSubmit = { ...values };
        await onSubmit(dataToSubmit);
        closeModal();
      } catch (err) {
        console.error("Submit error:", err);
      }
    },
    enableReinitialize: true,
  });

  return (
    <>
      {isModalOpen && (
        <div className="fixed top-0 left-0 z-50 w-full min-h-screen flex justify-center items-center bg-[rgba(0,0,0,0.4)]">
          <div className="w-full max-h-screen p-4 overflow-y-auto">
            <div className="relative w-full mx-auto max-w-2xl">
              <form onSubmit={formik.handleSubmit} className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{header}</h3>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                    ❌
                  </button>
                </div>
                <div className="flex flex-wrap">
                  {inputs.map((input, index) => {
                    const name = input.label.toLowerCase();
                    return (
                      <div key={index} className={` ${index > 2 ? "w-1/2" : "w-full"} px-6 py-4`}>
                        <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          {input.label}
                        </label>

                        {input.type === "file" ? (
                          <input
                            type="file"
                            name={name}
                            onChange={(e) => formik.setFieldValue(name, e.currentTarget.files[0])}
                            onBlur={formik.handleBlur}
                            className={`block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 focus:outline-none dark:bg-gray-600 dark:text-white`}
                          />
                        ) : input.type === "textarea" ? (
                          <textarea
                            name={name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values[name] ?? ""}
                            className={`block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 focus:outline-none dark:bg-gray-600 dark:text-white`}
                            placeholder={`Enter ${input.label}`}
                          />
                        ) : input.type === "select" ? (
                          <select
                            name={name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values[name] ?? ""}
                            className={`block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 focus:outline-none dark:bg-gray-600 dark:text-white`}>
                            <option value="">Select {input.label}</option>
                            {input.options?.map((opt, i) => (
                              <option key={i} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        ) : input.type === "password" ? (
                          <div className="relative mb-4">
                            <input
                              type={showPassword ? "text" : "password"}
                              name={name}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values[name] ?? ""}
                              placeholder={input.label}
                              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 focus:outline-none dark:bg-gray-600 dark:text-white"
                            />

                            <span
                              onClick={() => setShowPassword((prev) => !prev)}
                              className="absolute right-3 top-1/3 cursor-pointer text-gray-500">
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                          </div>
                        ) : (
                          <input
                            type={input.type}
                            name={name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values[name] ?? ""}
                            min={input.min}
                            max={input.max}
                            className={`block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 focus:outline-none dark:bg-gray-600 dark:text-white`}
                            placeholder={`Enter ${input.label} ${input.label === "Discount"?": 1 - 99":""}`}
                          />
                        )}

                        {formik.touched[name] && formik.errors[name] && (
                          <p className="mt-1 text-sm text-red-600">{formik.errors[name]}</p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-end p-2 border-t border-gray-300 dark:border-gray-600">
                  <button
                    type="submit"
                    className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5">
                    {formik.isSubmitting ? <ImSpinner9 className=" animate-spin text-xl" /> : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InputsModal;
