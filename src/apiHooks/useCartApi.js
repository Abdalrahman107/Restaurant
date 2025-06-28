import axios from 'axios';
import { useContext } from 'react';
import { authContext } from '../Context/AuthContext';


const BASE_URL = 'https://yumyum-server-six.vercel.app/carts/';

const useCartApi = () => {
  const { token } = useContext(authContext);

  const headers = { headers: { token } };

  const getCartItems = async () => {
    const res = await axios.get(`${BASE_URL}get`, headers);
    return res.data;
  };

  const addItemToCart = async ({ foodId, variantId, quantity }) => {
    return await axios.post(`${BASE_URL}`, { foodId, variantId, quantity }, headers);
  };

  const removeCartItem = async ({ foodId, variantId }) => {
    return await axios.delete(`${BASE_URL}delete`, {
      headers: { token },
      data: { foodId, variantId },
    });
  };

  const updateCartItemQty = async ({ foodId, variantId, count }) => {
    return await axios.put(`${BASE_URL}update`, { foodId, variantId, count }, headers);
  };

  const clearCart = async () => {
    return await axios.put(`${BASE_URL}clear`, null, headers);
  };

  return {
    getCartItems,
    addItemToCart,
    removeCartItem,
    updateCartItemQty,
    clearCart,
  };
};

export default useCartApi;