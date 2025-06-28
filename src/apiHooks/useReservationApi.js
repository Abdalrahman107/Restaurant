import axios from "axios";
import { useContext } from "react";
import { authContext } from "../Context/AuthContext";


const BASE_URL = "https://yumyum-server-six.vercel.app/reservations/";

const useReservationsApi = () => {
  const { token } = useContext(authContext);
  const headers = {
    headers: { token },
  };

  const createReservation = async ({
    customerName,
    phoneNumber,
    peopleCount,
    reservationDate,
    duration,
    email,
    branchId,
    timezone
  }) => 
    {
      console.log(customerName,
    phoneNumber,
    peopleCount,
    reservationDate,
    duration,
    email,
    branchId,
    timezone);
      
    const res = await axios.post(
      `${BASE_URL}`,
      {
        customerName,
        phoneNumber,
        peopleCount,
        reservationDate,
        duration: duration * 60, 
        email,
        branchId,
        timezone
      },
      headers
    );
    return res.data;
  };

  const getReservations = async () => {
    const res = await axios.get(`${BASE_URL}getReservations`, headers);
    return res.data;
  };

  const cancelReservation = async ({ reservationId }) => {
    return await axios.put(`${BASE_URL}${reservationId}`, null, headers);
  };

  return {
    createReservation,
    getReservations,
    cancelReservation,
  };
};

export default useReservationsApi;
