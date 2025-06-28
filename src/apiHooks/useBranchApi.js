import axios from "axios";
import { useContext } from "react";
import { authContext } from "../Context/AuthContext";


const BASE_URL = "https://yumyum-server-six.vercel.app/branches";

const useBranchApi = () => {
  const { token } = useContext(authContext);

  const getBranches = async () => {
      const res = await axios.get(BASE_URL);
      return res.data;
  };

  const createBranch = async ({ name, phone, address, image }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("image", image);

    await axios.post(`${BASE_URL}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        token,
      },
    });
  };

  const updateBranch = async ({ name, phone, address, image, id }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("image", image);

    await axios.put(`${BASE_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        token,
      },
    });
  };

  const deleteBranch = async ({ id }) => {
    await axios.delete(`${BASE_URL}/${id}`, { headers: { token } });
  };

  return {
    getBranches,
    createBranch,
    deleteBranch,
    updateBranch,
  };
};

export default useBranchApi;
