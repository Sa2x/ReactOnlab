export const fetchTvShows = (page) =>
  fetch(`http://api.tvmaze.com/shows?page=${page}`).then((res) => res.json());
