import { FaStar } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { RiStarSmileLine } from "react-icons/ri";

const ReviewModal = ({ isModalOpen, setIsModalOpen, formik }) => {
  return (
    <>
      {isModalOpen && (
        <div
          id="review-modal"
          className="flex fixed inset-0 z-50 items-center justify-center bg-[rgba(0,0,0,0.5)] dark:bg-[rgba(0,0,0,0.7)] text-black">
          <div className="relative p-4 sm:w-1/2 max-w-2xl max-h-full">
            
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 p-4">
              <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold dark:text-white">Leave a Review</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                type="button"
                className=" text-white cursor-pointer bg-gray-400 hover:bg-gray-500 hover:text-gray-900 rounded-full transition-colors duration-300 text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-800 dark:hover:text-white ml-auto">
                <IoMdClose className="text-lg" />
                <span className="sr-only">Close modal</span>
              </button>
              </div>
              {/* Modal header */}
              <form onSubmit={formik.handleSubmit} className="mx-auto mt-2">
                <textarea
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.comment}
                  name="comment"
                  type="text"
                  className="max-h-[50vh] mb-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-40 dark:text-white"
                  placeholder="Write a Comment"
                />

                {formik.touched.comment && formik.errors.comment ? (
                  <div className="mb-4 text-sm text-red-800 rounded-lg " role="alert">
                    {formik.errors.comment}
                  </div>
                ) : null}

                <div className="flex gap-x-1">
                  <h6 className="flex items-center mb-2 gap-x-2 dark:text-white mr-2">
                    <RiStarSmileLine className="text-2xl text-yellow-500" />
                    Rate:{" "}
                  </h6>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer text-2xl ${
                        star <= formik.values.rate ? "text-yellow-400" : "text-gray-400"
                      }`}
                      onClick={() => {
                        formik.setFieldValue("rate", star);
                        formik.setFieldTouched("rate", false);
                      }}
                    />
                  ))}
                </div>

                {formik.touched.rate && formik.errors.rate ? (
                  <div className="mb-4 text-sm text-red-800 rounded-lg " role="alert">
                    {formik.errors.rate}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className=" block ml-auto mt-4 text-white main-bg-color hover:bg-red-700! transition-colors cursor-pointer rounded-full text-sm px-8 py-3 text-center ">
                  {formik.isSubmitting ? <ImSpinner9 className=" animate-spin text-xl text-white" /> : "Add"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewModal;
