import axios from "axios";
import { useContext } from "react";
import { authContext } from "../Context/AuthContext";


const BASE_URL = "https://yumyum-server-six.vercel.app/orders/";

const useOrdersApi = () => {
  const { token } = useContext(authContext);

  const headers = {
    headers: {
      token,
    },
  };

  const getOrders = async () => {
    const res = await axios.get(`${BASE_URL}AllOrder`, headers);
    return res.data;
  };
  const getAllOrders = async () => {
    const res = await axios.get(`${BASE_URL}getOrders`);
    return res.data;
  };

  const createOrder = async ({ paymentmethod, address, phone }) => {
    const { data } = await axios.post(
      `${BASE_URL}`,
      {
        paymentmethod,
        address,
        phone,
      },
      headers
    );
    return data;
  };

  const getStatusOrder = async (orderId) => {
    const { data } = await axios.get(`${BASE_URL}status/${orderId}`, headers);
    return data;
  };
  const cancelOrder = async ({ orderId }) => {
    const { data } = await axios.put(`${BASE_URL}${orderId}`, {}, headers);
    return data;
  };

  return {
    getOrders,
    createOrder,
    getStatusOrder,
    cancelOrder,
    getAllOrders
  };
};

export default useOrdersApi;
