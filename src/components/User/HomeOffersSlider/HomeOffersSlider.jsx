import Slider from "react-slick";
import img1 from "../../../assets/images/offers.jpg";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import useMenuApi from "../../../apiHooks/useMenuApi";

function HomeOffersSlider() {
  const { getMenuOffers } = useMenuApi();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["foodOffers"],
    queryFn: getMenuOffers,
  });

  if (isError) {
    console.log(error);
    return (
      <div className="py-6 text-center">
        <p className="text-red-400">{ error?.response?.data?.err || err?.response?.data || "Could not load Offers."}
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

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    customPaging: () => (
      <div className="text-white hover:text-gray-800 scale-500 transition-all duration-300 cursor-pointer h-8 w-2">
        .
      </div>
    ),
    waitForAnimate: false,
  };
  return (
    <div className="slider-container w-[60%] text-center border-0 ">
      <Slider {...settings}>
        <Link to={"/menu"} className="text-white relative">
          <img src={img1} className="w-full h-[20vh] object-cover focus:border-none! focus:outline-none!" alt="offers image general" />
          <div className="animate__animated animate__slideInDown absolute top-0 right-2 text-sm md:text-lg bg-red-500 w-16 md:w-24 md:h-28 font-semibold  border-dashed border-b-6 border-slate-100 flex flex-col justify-center items-center">
            Up To<span className="text-lg md:text-3xl font-bold"> 50% </span> discount
          </div>
          <div className="animate__animated animate__rollIn f-nunito absolute bottom-6 left-4 w-20 md:h-16 md:w-28 bg-red-500 -rotate-16 p-1 text-sm md:text-xl font-bold flex justify-center items-center">
            TODAY'S MENU
          </div>
        </Link>

        {data.foods?.map((offer) => {
          return (
            <Link to={"/menu"} key={offer._id} className="text-white relative">
              <img
                src={offer.image.secure_url}
                className="w-full h-[20vh] object-cover focus:border-none! focus:outline-none!"
                alt="offer image for food"
              />
              <div className="absolute bottom-2 right-2 bg-red-500 w-16 h-16 md:w-24 md:h-24 flex justify-center items-center rounded-full font-semibold rotate-20 text-lg md:text-2xl">
                Save
                <br />
                {offer.discount}%
              </div>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
}

export default HomeOffersSlider;
