import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import useMenuApi from "../../../apiHooks/useMenuApi";

function HomeCategorySlider() {
  const { getFoodCategories } = useMenuApi();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getFoodCategories,
  });

  if (isError) {
    console.log(error);
    return (
      <div className="py-6 text-center">
        <p className="text-red-400">{ error?.response?.data?.err || error?.response?.data || "Could not load Categories."}</p>
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

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,

    responsive: [
      {
        breakpoint: 992,
        settings: { centerPadding: "50px", centerMode: true, slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { centerPadding: "40px", centerMode: true, slidesToShow: 1 },
      },
    ],
  };
  return (
    <div className="slider-container w-[60%] text-center border-0 mt-4">
      <Slider {...settings}>
        {data?.categories?.map((category) => {
          return (
            <Link key={category._id} to={`/menu/${category._id}`} className="text-white relative">
              <div className="relative mx-4">
                <img
                  src={category.image.secure_url}
                  className="w-full h-[20vh] object-cover focus:border-none! focus:outline-none!"
                  alt="category food image "
                />
                <div className="f-danc absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-full bg-[rgba(0,0,0,0.4)] py-8 font-semibold text-2xl sm:text-4xl">
                  {category.name}
                </div>
              </div>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
}

export default HomeCategorySlider;
