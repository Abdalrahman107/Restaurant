import img from "../../../assets/images/reservationbg.jpg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { Link } from "react-router-dom";
import moment from "moment-timezone";

import useReservationsApi from "../../../apiHooks/useReservationApi";
import useBranchApi from "../../../apiHooks/useBranchApi";
import SectionHeader from "../SectionHeader/SectionHeader";


const CreateReservation = () => {
  const queryClient = useQueryClient();
  const { createReservation } = useReservationsApi();
  const { getBranches } = useBranchApi();

  const CreateReservationMutation = useMutation({
    mutationFn: createReservation,
    onSuccess: () => {
      toast.success("Reservation created, Please Confirm via your Email", {
        duration: 7000,
      });
      queryClient.invalidateQueries(["reservations"]);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message + "you can reserve a table at : " + error?.response?.data?.nextAvailableAt || error?.response?.data || "Failed to create reservation");
    },
  });

  const createNewReservation = CreateReservationMutation.mutateAsync;

  const {
    data: branchesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["branches"],
    queryFn: getBranches,
  });

  const formik = useFormik({
    initialValues: {
      customerName: "",
      phoneNumber: "",
      peopleCount: "",
      reservationDate: "",
      duration: "",
      email: "",
      branchId: "",
      timezone: "",
    },
    validationSchema: Yup.object({
      customerName: Yup.string().trim().required("Input is required"),
      phoneNumber: Yup.string()
        .trim()
        .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
        .required("Input is required"),
      peopleCount: Yup.number().min(1, "minmum is 1 person").required("Input is required"),
      reservationDate: Yup.date().required("Input is required"),
      duration: Yup.number().min(2, "minmum is 2 hour").required("Input is required"),
      email: Yup.string().trim().email("Please enter a valid email").required("Input is required"),
      branchId: Yup.string().trim().required("Input is required"),
    }),
    onSubmit: async (values) => {
        const formattedValues = {
          ...values,
          reservationDate: moment(values.reservationDate).format("YYYY-MM-DDTHH:mm"),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
        await createNewReservation(formattedValues);
        formik.resetForm();
    },
  });

  return (
    <div className="-mt-20 relative bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}>
      <div className="layer absolute left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.6)]"></div>
      <div className="container min-h-screen flex flex-col justify-center">
        <div className="text-white mb-4">
          <SectionHeader header="Reserve s Table" />
        </div>

        {/* Reservation Form */}

        <form onSubmit={formik.handleSubmit} className="w-full sm:w-3/5 mx-auto">
          {/* name */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="customerName"
              value={formik.values.customerName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2 px-4 w-full text-white placeholder:text-white bg-transparent border border-slate-300 focus:outline-none focus:border-cyan-500 rounded-lg"
              placeholder="Name"
            />
            {/* validation */}
            {formik.touched.customerName && formik.errors.customerName ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.customerName}</div>
            ) : null}
          </div>
          {/* email */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2 px-4 w-full text-white placeholder:text-white bg-transparent border border-slate-300 focus:outline-none focus:border-cyan-500 rounded-lg"
              placeholder="Email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            ) : null}
          </div>
          {/* phone */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2 px-4 w-full text-white placeholder:text-white bg-transparent border border-slate-300 focus:outline-none focus:border-cyan-500 rounded-lg"
              placeholder="Phone"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</div>
            ) : null}
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            {/* date and time in */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="datetime-local"
                name="reservationDate"
                value={formik.values.reservationDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block py-2 px-4 w-full text-white placeholder:text-white bg-transparent border border-slate-300 focus:outline-none focus:border-cyan-500 rounded-lg"
                placeholder="Date"
              />
              {formik.touched.reservationDate && formik.errors.reservationDate ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.reservationDate}</div>
              ) : null}
            </div>
            {/* no. of persons */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                value={formik.values.peopleCount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="peopleCount"
                min={1}
                step={1}
                placeholder="Number of Persons"
                className="block py-2 px-4 w-full text-white bg-transparent border border-slate-300 focus:outline-none focus:border-cyan-500 rounded-lg placeholder:text-slate-300"
              />
              {formik.touched.peopleCount && formik.errors.peopleCount ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.peopleCount}</div>
              ) : null}
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            {/* Duration in Hours */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                value={formik.values.duration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="duration"
                min={1}
                step={1}
                placeholder="Duration (hours)"
                className="block py-2 px-4 w-full text-white bg-transparent border border-slate-300 focus:outline-none focus:border-cyan-500 rounded-lg placeholder:text-slate-300"
              />
              {formik.touched.duration && formik.errors.duration ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.duration}</div>
              ) : null}
            </div>
            {/* Branch Select */}
            <div className="relative z-0 w-full mb-5 group">
              <select
                name="branchId"
                value={formik.values.branchId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block py-2 px-4 w-full text-white bg-transparent border border-slate-300 focus:outline-none focus:border-cyan-500 rounded-lg">
                <option value="" hidden>
                  Select Branch
                </option>
                {!isLoading &&
                  !isError &&
                  branchesData?.branches?.map((branch) => (
                    <option key={branch._id} className="text-black" value={branch._id}>
                      {branch.name}
                    </option>
                  ))}
              </select>
              {formik.touched.branchId && formik.errors.branchId ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.branchId}</div>
              ) : null}
              {isError ? <div className="text-red-500 text-sm mt-1">Error:somthing went Wrong</div> : null}
              {isLoading ? <ImSpinner9 className="animate-spin text-white" /> : null}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <Link
              to="/allReservations"
              className="order-1 md:order-0 block mt-4 cursor-pointer relative text-white bg-sky-600 hover:bg-blue-800 focus:outline-none font-medium rounded-lg  w-full sm:w-auto px-8 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">
              Show All Reservations
            </Link>
            <button
              type="submit"
              className="block mt-4 cursor-pointer relative text-white bg-sky-600 hover:bg-blue-800 focus:outline-none font-medium rounded-lg  w-full sm:w-auto px-8 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">
              {formik.isSubmitting ? <ImSpinner9 className=" animate-spin text-xl text-white mx-auto" /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReservation;
