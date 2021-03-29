import axios from "axios";

export const fetchTvShowById = async (id) => {
  const { data } = await axios.get(`http://api.tvmaze.com/shows/${id}`);
  return data;
};
