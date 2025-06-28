import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";
import { useState } from "react";
import useReservationsApi from "../../../apiHooks/useReservationApi";

const AllReservations = () => {
  const [deletingId, setDeletingId] = useState(null);
  const queryClient = useQueryClient();
  const { cancelReservation, getReservations } = useReservationsApi();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservations,
  });
  console.log(data);
  

  const cancelReservationMutation = useMutation({
    mutationFn: cancelReservation,
    onSuccess: () => {
      toast.success("Your Reservation is Cancelled", {
        duration: 7000,
      });
      queryClient.invalidateQueries(["reservations"]);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data ||"Failed to cancel reservation");
    },
  });

  const cancelCurrentReservation = cancelReservationMutation.mutateAsync;

  if (isError){
    console.log(error);
     return <div className="min-h-[65vh] text-center text-red-500 mt-8">{ error?.response?.data?.err || error?.response?.data || "Could not load reservations."}</div>;
  }
  if (isLoading)
  {
    return (
      <div className="h-[65vh] flex justify-center items-center">
        <ImSpinner9 className="animate-spin text-4xl text-red-600" />
      </div>
    );
  }
  if (data?.reservations?.length === 0){
    return <div className="min-h-[65vh] text-center mt-8 text-xl text-gray-500">You have no reservations.</div>;
  }
  return (
    <div className="bg-neutral-50 dark:bg-gray-900 min-h-[65vh]">
      <div className="container py-8 min-h-[60vh] dark:text-white">
        <h2 className="text-2xl font-bold mb-6">Your Reservations</h2>
        <div className="space-y-4">
          {data?.reservations?.map((reservation) => {
            if (reservation.status === "active") {
              return (
                <div
                  key={reservation._id}
                  className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-y-4 ">
                  <div>
                    <p className="mb-1">
                      <span className="font-bold">Date:</span>{" "}
                      {new Date(reservation.reservationDate).toLocaleDateString()}
                    </p>
                    <p className="mb-1">
                      <span className="font-bold">Time:</span>{" "}
                      {new Date(reservation.reservationDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="mb-1">
                      <span className="font-bold">Duration:</span> {reservation.duration / 60} hours
                    </p>
                    <p className="mb-1">
                      <span className="font-bold">phone:</span> {reservation.phoneNumber}
                    </p>
                    <p className="mb-1">
                      <span className="font-bold">guests:</span> {reservation.peopleCount}
                    </p>
                    <p className="mb-1">
                      <span className="font-bold">Name:</span> {reservation.customerName}
                    </p>
                    <p className="mb-1">
                      <span className="font-bold">Branch:</span> {reservation.branchId.name}
                    </p>
                  </div>
                  <button
                    onClick={async () => {
                      setDeletingId(reservation._id);
                      await cancelCurrentReservation({
                        reservationId: reservation._id,
                      });
                      setDeletingId(null);
                    }}
                    className="cursor-pointer bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600 transition sm:self-end">
                    {cancelReservationMutation.isPending && deletingId === reservation._id ? (
                      <ImSpinner9 className="animate-spin" />
                    ) : (
                      "Cancel Reservation"
                    )}
                  </button>
                </div>
              );
            }
          })}
          {data?.reservations?.some((res) => res.status === "active") ? null : (
            <p className="text-center mt-6 text-2xl main-color">No Reservations Yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllReservations;
