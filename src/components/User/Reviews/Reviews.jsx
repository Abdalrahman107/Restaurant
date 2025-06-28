import img from "../../../assets/images/review.jpg";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../SectionHeader/SectionHeader";
import ReviewModal from "../ReviewModal/ReviewModal";
import ReviewsSlider from "../ReviewsSlider/ReviewsSlider";
import { authContext } from "../../../Context/AuthContext";
import useReviewsApi from "../../../apiHooks/useReviewsApi";

const Reviews = () => {
  const { createReview } = useReviewsApi();
  const { token } = useContext(authContext);
  const role = localStorage.getItem("role");

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const CreateReviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.err || err?.response?.data || "Something went wrong");
    },
  });

  const createNewReview = CreateReviewMutation.mutateAsync;

  const formik = useFormik({
    initialValues: {
      comment: "",
      rate: 0,
    },
    validationSchema: Yup.object({
      comment: Yup.string().trim().required("Input is Required"),
      rate: Yup.number().min(1, "Please select a rating").required("Rating is required"),
    }),
    onSubmit: async (values) => {
        await createNewReview(values);
        toast.success("Review added!");
        setIsModalOpen(false);
    },
  });

  return (
    <div
      className={`py-16 text-white bg-cover bg-center bg-no-repeat bg-fixed`}
      style={{ backgroundImage: `url(${img})` }}>
      {/* header  */}
      <div className="container">
        <SectionHeader header={"Reviews"} />
      </div>

      <ReviewsSlider />

      {/* modal ope button */}

      <button
        onClick={() => {
          if (!(token && role === "user")) {
            navigate("/requiredLogin");
          } else {
            setIsModalOpen(true);
          }
        }}
        type="button"
        className="group mr-6 ml-auto flex items-center gap-x-4 border border-transparent hover:border-red-500 text-gray-200 px-2 py-1 rounded-full cursor-pointer">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Add Review</span>
        <IoIosAddCircleOutline className="text-4xl transform group-hover:rotate-180 transition duration-300" />
      </button>

      <ReviewModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} formik={formik} />

      {/* add review Modal */}
    </div>
  );
};

export default Reviews;

