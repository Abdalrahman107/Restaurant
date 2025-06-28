import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useOrdersApi from "../../../apiHooks/useOrdersApi";


export default function PaymentResult({ paymentStatus }) {
  const navigate = useNavigate();

  const { getStatusOrder, cancelOrder } = useOrdersApi();

  const { id: orderId } = useParams();

  const queryClient = useQueryClient();

  const cancelOrderMutation = useMutation({
    mutationFn: ({ orderId }) => cancelOrder({ orderId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (error) => {
      console.log(error);
      
      toast.error(error?.response?.data?.err || error?.response?.data || "Something went wrong");
    },
  });

  const cancelCurrenOrder = cancelOrderMutation.mutateAsync;

  useEffect(() => {
    if (paymentStatus === "cancel" && orderId) {
      cancelCurrenOrder({ orderId });

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 5000);
    }
  },[paymentStatus, orderId]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orderStatus", orderId],
    queryFn: () => getStatusOrder(orderId),
  });

  if (isError) {
    console.log(error);
    return (
      <div className="py-6 min-h-screen text-center">
        <p className="text-red-400">{ error?.response?.data?.err || error?.response?.data || "Could not load page."}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        <ImSpinner9 className="animate-spin text-blue-600 text-3xl" />
      </div>
    );
  }

  return (
      <div className="flex justify-center items-start mt-6 min-h-screen"> 
      <div className="w-[95%] mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow-2xl text-center space-y-4">
        {paymentStatus === "cancel" || paymentStatus === "rejected" ? (
          <>
            <h2 className="text-red-600 text-2xl font-bold">
              Payment Cancelled
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your order has been cancelled.
            </p>
            <p className=" dark:text-gray-400">
              Redirecting to home in 3 seconds...
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
              Back to Home
            </button>
          </>
        ) : data?.status === "placed" ? (
          <>
            <h2 className="text-green-600 text-2xl font-bold">
              Payment Successful 🎉
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your order has been confirmed.
            </p>
            <button
              onClick={() => navigate("/orders")}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              View My Orders
            </button>
          </>
        ) : (
          <>
            <h2 className="text-sky-500 text-2xl font-bold">
              Payment in progrees
            </h2>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition">
              home
            </button>
          </>
        ) }
      </div>
    </div>
  );
}

