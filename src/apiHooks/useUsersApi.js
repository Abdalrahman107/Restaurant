import axios from 'axios';
import { useContext } from 'react';
import { authContext } from '../Context/AuthContext';


const BASE_URL = 'https://yumyum-server-six.vercel.app/users';

const useUsersApi = () => {
   const { token } = useContext(authContext);
    const headers = { headers: { token } };
   
  const getUsers = async () => {
      const res = await axios.get(BASE_URL, headers);
      return res.data;
  };

 const createUser = async (formData) => {
 const body = {
  name: formData.name,
  email: formData.email,
  password: formData.password,
};

  const res = await axios.post(`${BASE_URL}/admin`, body, {
    headers: {
      token, 
    },
  });

  return res.data;
};
 const updateUser= async ({formData, id }) => {
const body = {
    name:formData.name,
    email:formData.email
}

  const res = await axios.put(`${BASE_URL}/${id}`, body, {
    headers: {
      token, 
    },
  });

  return res.data;
};


 const deleteUser = async ( id ) => {
  const res = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      token, 
    },
  });
  return res.data;
};

  return {
     getUsers,
      createUser,
      deleteUser,
      updateUser
    };
};

export default useUsersApi;



