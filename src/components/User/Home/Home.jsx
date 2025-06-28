import { FaArrowRight, FaWhatsapp } from "react-icons/fa";
import { MdAddCall } from "react-icons/md";
import { Link } from "react-router-dom";
import img from "../../../assets/images/homebg.jpg";
import Reviews from "../Reviews/Reviews";
import Branches from "../Branches/Branches";
import WhyChoose from "../WhyChoose/WhyChoose";
import HomeOffersSlider from "../HomeOffersSlider/HomeOffersSlider";
import HomeCategorySlider from "../HomeCategorySlider/HomeCategorySlider";

const Home = () => {
  return (
    <>
      <div
        className="home min-h-screen md:-mt-20 bg-cover bg-center relative overflow-hidden "
        style={{ backgroundImage: `url(${img})` }}>
        <div className="layer absolute left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.4)]"></div>

        <div className="relative md:py-20 flex flex-col items-center min-h-screen">
          <HomeOffersSlider />
          <div className="px-6 text-white text-center text-4xl sm:text-6xl animate__animated animate__fadeInUp animate__delay-1s mt-10">
            <h1 className="f-nunito font-extrabold self-center">
              Yummy<span className="main-color">Yum</span>
            </h1>
            <p className="text-sm sm:text-lg text-slate-200">Fast Food Restaurant</p>
          </div>
          <HomeCategorySlider />

          <Link to="/menu">
            <button
              type="button"
              className={`w-[85px] sm:w-32 absolute top-0 left-0  animate__animated animate__slideInLeft mt-[32vh] text-white cursor-pointer bg-[#e52b34]  font-medium rounded-r-full sm:text-xl p-1 sm:px-4 py-2 text-center flex items-center gap-x-3 sm:gap-x-7`}>
              Menu <FaArrowRight className="sm:text-xl animate__animated animate__slideInLeft animate__infinite" />
            </button>
          </Link>
          <a
            href="https://wa.me/9999?text=Hello%20I%20want%20to%20ask%20about%20your%20menu"
            target="_blank"
            rel="noopener noreferrer"
            type="button"
            className="-mr-26 hover:mr-0 transition-all duration-500 absolute right-0 animate__animated animate__slideInRight mt-[40vh] text-white cursor-pointer bg-green-500 font-medium rounded-l-full text-lg px-4 py-2.5 flex items-center gap-x-2 text-center">
            <FaWhatsapp className="text-2xl" /> Whatsapp
          </a>
          <button
            type="button"
            className="-mr-34 hover:mr-0 transition-all duration-500 absolute right-0 animate__animated animate__slideInRight mt-[60vh] cursor-pointer bg-white font-medium rounded-l-full text-lg px-4 py-2.5 text-center flex items-center gap-x-2 ">
            <MdAddCall className="text-2xl" />
            Call Us : 9999
          </button>
        </div>
      </div>

      <Branches />

      <Reviews />

      <WhyChoose />
    </>
  );
};

export default Home;
