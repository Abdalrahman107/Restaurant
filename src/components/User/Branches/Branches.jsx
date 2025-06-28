import SectionHeader from "../SectionHeader/SectionHeader";
import { MdOutlineFastfood } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import useBranchApi from "../../../apiHooks/useBranchApi";

const Branches = () => {
  const { getBranches } = useBranchApi();

  const {
    data: branchesData,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["branches"],
    queryFn: getBranches,
  });

  if (isError) {
    console.log(error);
    return (
      <div className="py-6 text-center">
        <SectionHeader header="Branches" />
        <p className="text-red-400">{ error?.response?.data?.err || error?.response?.data || "Could not load Branches."}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-6">
        <SectionHeader header="Branches" />
        <ImSpinner9 className="animate-spin text-4xl main-color mx-auto" />
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 dark:bg-gray-900 dark:text-white py-7">
      <div className="w-[95%] mx-auto">
        <SectionHeader header="Branches" />

        {branchesData?.branches?.map((branch, index) => {
          return (
            <div key={branch._id} className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
              <div className="w-full sm:w-2/3">
                <img src={branch.image.secure_url} className=" w-full h-[40vh] object-cover" alt="restaurant branch inage" />
              </div>
              <div
                className={`${
                  index % 2 === 0 ? "" : "sm:-order-1"
                } flex gap-x-4 flex-wrap sm:gap-x-0 sm:flex-col gap-y-4 sm:gap-y-6 items-start justify-start w-full sm:w-auto`}>
                <div className="flex items-center gap-x-4">
                  <div className="p-2 sm:p-4 bg-red-500 flex justify-center items-center">
                    <MdOutlineFastfood className="text-white sm:text-2xl" />{" "}
                  </div>
                  <h3 className="f-nunito font-extrabold self-center text-lg sm:text-2xl dark:text-white">
                    Yummy<span className="main-color">Yum</span>
                    <br /> {branch.name}
                  </h3>
                </div>
                <div className="flex items-center gap-x-4 sm:ml-10">
                  <div className="p-2 sm:p-4 bg-red-500 flex justify-center items-center">
                    <FaLocationDot className="text-white sm:text-2xl" />{" "}
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-lg">Visit Us At:</p>
                    <h3>{branch.address}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-x-4">
                  <div className="p-2 sm:p-4 bg-red-500 flex justify-center items-center">
                    <FaPhoneAlt className="text-white sm:text-2xl" />{" "}
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-lg">Call Us:</p>
                    <h3>{branch.phone}</h3>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Branches;
