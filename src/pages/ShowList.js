import React from "react";
import { useQuery } from "react-query";
import { fetchTvShows } from "../api/fetchTvShows";
import { Link } from "react-router-dom";

const ShowList = () => {
  const { data, isLoading, error } = useQuery("shows", fetchTvShows);

  return (
    <div>
      {!isLoading &&
        data.map((show) => (
          <Link to={`/shows/${show.id}`}>
            <h3>{show.name}</h3>
          </Link>
        ))}
    </div>
  );
};

export default ShowList;
