export const fetchTvShowById = (id) =>
  fetch(`http://api.tvmaze.com/shows/${id}`).then((res) => res.json());
