import axios from 'axios';

export const fetchUserById = async (id) => {
  const { data } = await axios.get(`http://localhost:8080/api/user/${id}`);
  return data;
};
