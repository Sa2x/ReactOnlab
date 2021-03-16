export const fetchTvShows = () =>
  fetch("http://api.tvmaze.com/shows?page=1").then((res) => res.json());
