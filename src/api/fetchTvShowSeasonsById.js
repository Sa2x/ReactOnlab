import axios from "axios";

export const fetchTvShowSeasonsById = async (id) => {
  const { data } = await axios.get(
    `https://api.tvmaze.com/shows/${id}/seasons`
  );
  return data;
};
