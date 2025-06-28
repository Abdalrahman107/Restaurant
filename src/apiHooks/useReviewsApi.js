import axios from 'axios';
import { useContext } from 'react';
import { authContext } from '../Context/AuthContext';


const BASE_URL = "https://yumyum-server-six.vercel.app/reviews/";

const useReviewsApi = () => {
  const { token } = useContext(authContext);

  const headers = {
    headers: { token },
  };

  const getReviews = async () => {
    const res = await axios(`${BASE_URL}Reviews`);
    return res.data;
  };

  const createReview = async ({ comment, rate }) => {
    const res = await axios.post(`${BASE_URL}`, { comment, rate }, headers);
    return res.data;
  };

  return {
    getReviews,
    createReview,
  };
};

export default useReviewsApi;
