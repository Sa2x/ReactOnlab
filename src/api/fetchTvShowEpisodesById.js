import axios from "axios";

export const fetchTvShowEpisodesById = async (id) => {
  const { data } = await axios.get(
    `http://api.tvmaze.com/shows/${id}/episodes`
  );
  return data;
};
