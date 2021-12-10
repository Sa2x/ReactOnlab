import axios from 'axios';

export const fetchUsers = async () => {
  const { data } = await axios.get(`http://localhost:8080/api/user/`);
  return data;
};
