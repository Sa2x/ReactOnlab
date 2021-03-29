import axios from "axios";

export const fetchTvShows = async (page, search) => {
  let response = {};
  if (search) {
    const { data } = await axios.get(
      `http://api.tvmaze.com/search/shows?q=${search}`
    );
    response = data;
  } else {
    const { data } = await axios.get(
      `http://api.tvmaze.com/shows?page=${page}`
    );
    response = data;
  }
  return response;
};
