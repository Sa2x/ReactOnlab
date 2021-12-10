import axios from 'axios';

export const fetchTvShowById = async (id) => {
  const { data } = await axios.get(`http://localhost:8080/api/show/${id}`);
  return data;
};
