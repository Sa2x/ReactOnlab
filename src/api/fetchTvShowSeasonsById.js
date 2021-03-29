import axios from "axios";

export const fetchTvShowSeasonsById = async (id) => {
  const { data } = await axios.get(`http://api.tvmaze.com/shows/${id}/seasons`);
  return data;
};
