import axios from 'axios';
import { useContext } from 'react';
import { authContext } from '../Context/AuthContext';


const BASE_URL = 'https://yumyum-server-six.vercel.app/tabels';

const useTablesApi = () => {
   const { token } = useContext(authContext);
    const headers = { headers: { token } };
   
  const getTables = async () => {
      const res = await axios.get(BASE_URL, headers);
      return res.data ;
  };

 const createTable = async (formData) => {
 const body = {
  number: formData.number,
  capacity: formData.capacity,
  branchId: formData.branch,
};

  const res = await axios.post(`${BASE_URL}`, body, {
    headers: {
      token, 
    },
  });

  return res.data;
};
 const updateTable= async ({formData, id, branchId }) => {
 const body = {
  number: formData.number,
  capacity: formData.capacity,
  branchId
};
  const res = await axios.put(`${BASE_URL}/${id}`, body, {
    headers: {
      token, 
    },
  });

  return res.data;
};


 const deleteTable = async ( id ) => {
  const res = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      token, 
    },
  });

  return res.data;
};





  return {
     getTables,
      createTable,
      deleteTable,
      updateTable
    };
};

export default useTablesApi;



