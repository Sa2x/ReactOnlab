import axios from 'axios';

export const fetchTvShows = async (page, search) => {
  let response = {};
  if (search) {
    const { data } = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${search}`
    );
    response = data;
  } else {
    const { data } = await axios.get(
      `http://localhost:8080/api/show?page=${page}`
    );
    response = data;
  }
  return response;
};
