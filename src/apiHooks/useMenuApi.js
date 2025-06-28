import axios from 'axios';
import { useContext } from 'react';
import { authContext } from '../Context/AuthContext';

const BASE_URL = 'https://yumyum-server-six.vercel.app';

const useMenuApi = () => {


   const { token } = useContext(authContext);
  
    const headers = {
      headers: { token },
    };

  const getCategoryFoods = async (id) => {
      const response = await axios.get(`${BASE_URL}/categories/${id}`);
      return response.data;
  };

  const getMenuOffers = async () => {
      const response = await axios.get(`${BASE_URL}/foods`);
      return response.data;
  };
  const getAllFoods = async () => {
      const response = await axios.get(`${BASE_URL}/foods/All`);
      return response.data;
  };

  const getFoodDetails = async (id) => {
      const response = await axios.get(`${BASE_URL}/foods/${id}`);
      return response.data;
  };

  const getFoodCategories = async () => {
      const response = await axios.get(`${BASE_URL}/categories`);
      return response.data;
  };


const createCategory = async ({ name, image }) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);


  await axios.post(`${BASE_URL}/categories/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      token
    },
  });
};


const updateCategory = async ({ name, image, id }) => {

  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);

  await axios.patch(`${BASE_URL}/categories/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      token, 
    },
  });
};




const deleteCategory = async ({ id }) => {
  await axios.delete(`${BASE_URL}/categories/delete/${id}`, headers);
};




 const createFood = async (formData) => {
  const body = new FormData();
  body.append("title", formData.title);
  body.append("description", formData.description);
  body.append("category", formData.categoryId);
  body.append("discount", formData.discount);
  body.append("categoryName", formData.category);
  body.append("image", formData.image);

  const variants = [{
    type: formData["variant type"],
    label: formData["variant label"],
    price: formData["variant price"],
  }];
  body.append("variants", JSON.stringify(variants));

  const res = await axios.post(`${BASE_URL}/foods/`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
      token, 
    },
  });

  return res.data;
};


 const updateFood = async (formData) => {
  const body = new FormData();
  body.append("title", formData.title);
  body.append("description", formData.description);
  body.append("category", formData.category);
  body.append("discount", formData.discount);
  body.append("image", formData.image);

  const res = await axios.put(`${BASE_URL}/foods/update/${formData.foodId}`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
      token, 
    },
  });

  return res.data;
};


 const deleteFood = async (id) => {
  const res = await axios.delete(`${BASE_URL}/foods/delete/${id}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      token, 
    },
  });

  return res.data;
};


 const createVariant = async (formData) => {
 const body = {
  type: formData.type,
  label: formData.label,
  price: formData.price,
};

  const res = await axios.post(`${BASE_URL}/foods/food/${formData.foodId}`, body, {
    headers: {
      token, 
    },
  });

  return res.data;
};
 const updateVariant = async (formData) => {
 const body = {
  type: formData.type,
  label: formData.label,
  price: formData.price,
};

  const res = await axios.put(`${BASE_URL}/foods/food/${formData.foodId}/variant/${formData.variantId}`, body, {
    headers: {
      token, 
    },
  });

  return res.data;
};


 const deleteVariant = async ( { foodId, variantId } ) => {
  const res = await axios.delete(`${BASE_URL}/foods/food/${foodId}/variant/${variantId}`, {
    headers: {
      token, 
    },
  });

  return res.data;
};








  return {
    getCategoryFoods,
    getMenuOffers,
    getFoodDetails,
    getFoodCategories,
    createCategory,
    deleteCategory,
    updateCategory,
    getAllFoods,
    createFood,
    updateFood,
    deleteFood,
    createVariant,
    updateVariant,
    deleteVariant,

  };
};

export default useMenuApi;
