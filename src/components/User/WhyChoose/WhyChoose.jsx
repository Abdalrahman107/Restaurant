import { GiCampCookingPot } from "react-icons/gi";
import { MdSpeed } from "react-icons/md";
import { SiCodechef, SiIfood } from "react-icons/si";
import SectionHeader from "../SectionHeader/sectionHeader";

const WhyChoose = () => {
  return (
    <div className="bg-neutral-50 dark:bg-gray-900 dark:text-white py-7">
      <div className="w-[95%] mx-auto">
        <SectionHeader header="Why Choose Us" />

        <div className="flex flex-col sm:flex-row flex-wrap items-center">
          <div className="sm:w-1/2 md:w-1/3 xl:w-1/4 p-4 ">
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 text-center">
              <p className="main-color flex justify-center mb-4 text-4xl">
                <SiIfood />
              </p>
              <h5 className="f-nunito mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Fresh Ingredients
              </h5>
              <p className="text-start mb-3 font-normal text-gray-500 dark:text-gray-400">
                We source local, seasonal ingredients for the most authentic flavors
              </p>
            </div>
          </div>
          <div className="sm:w-1/2 md:w-1/3 xl:w-1/4 p-4 ">
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 text-center">
              <p className="main-color flex justify-center mb-4 text-4xl">
                <SiCodechef />
              </p>
              <h5 className="f-nunito mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Expert Chefs
              </h5>
              <p className="text-start mb-3 font-normal text-gray-500 dark:text-gray-400">
                Our award-winning chefs craft culinary masterpieces from the finest ingredients
              </p>
            </div>
          </div>
          <div className="sm:w-1/2 md:w-1/3 xl:w-1/4 p-4 ">
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 text-center">
              <p className="main-color flex justify-center mb-4 text-4xl">
                <MdSpeed />
              </p>
              <h5 className="f-nunito mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Fast Service
              </h5>
              <p className="text-start mb-3 font-normal text-gray-500 dark:text-gray-400">
                Prompt and attentive service that respects your time and preferences
              </p>
            </div>
          </div>
          <div className="sm:w-1/2 md:w-1/3 xl:w-1/4 p-4 ">
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 text-center">
              <p className="main-color flex justify-center mb-4 text-4xl">
                <GiCampCookingPot />
              </p>
              <h5 className="f-nunito mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Fresh Ingredients
              </h5>
              <p className="text-start mb-3 font-normal text-gray-500 dark:text-gray-400">
                A sophisticated setting perfect for memorable dining experiences
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
