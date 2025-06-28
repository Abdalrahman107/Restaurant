import Slider from "react-slick";
import avatar from "../../../assets/images/avatar.png";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import useReviewsApi from "../../../apiHooks/useReviewsApi";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} before:text-white! scale-140 `}
      style={{ ...style, display: "block" }}
      onClick={onClick}></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} before:text-white! scale-140 `}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function ReviewsSlider() {
  const { getReviews } = useReviewsApi();

  const {
    data: reviewsData,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });
  

  if (isError) {
    console.log(error);
    return (
      <div className="py-6 text-center text-red-400">
        <p>{ error?.response?.data?.err || error?.response?.data || "Could not load reviews."}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-6">
        <ImSpinner9 className="animate-spin text-4xl main-color mx-auto" />
      </div>
    );
  }

  const length = 3;
  const vertical = length === 1 ? true : false;
  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    infinite: true,
    speed: 500,
    dots: false,
    vertical,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container py-7 w-[88%] mx-auto">
      <Slider {...settings}>
        {reviewsData?.reviews.map((review) => {
          return (
            <div key={review._id}>
              <div className="flex items-start gap-x-2 justify-center mx-1 ">
                <img className="w-14 h-14 rounded-full" src={ review?.createdBy?.picture || avatar } alt="user image" />
                <div className="flex flex-col  leading-1.5 p-4 bg-white shadow-lg rounded-e-xl rounded-es-xl dark:bg-gray-700">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold main-color mb-2">{review?.createdBy?.name}</span>
                  </div>
                  <div className="flex text-yellow-400 text-xl">
                    {[1, 2, 3, 4, 5].map((x, index) => {
                      return (
                        <span key={index}>
                          {x > review.rate ? review.rate - (x - 1) > 0 ? <FaStarHalfAlt /> : <FaRegStar /> : <FaStar />}
                        </span>
                      );
                    })}
                  </div>
                  <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{review.comment}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default ReviewsSlider;
