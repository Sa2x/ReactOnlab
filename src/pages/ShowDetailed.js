import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchTvShowById } from "../api/fetchTvShowbyId";
import { fetchTvShows } from "../api/fetchTvShows";

const ShowDetailed = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(["show", id], () =>
    fetchTvShowById(id)
  );

  return <div>{!isLoading && data.name}</div>;
};

export default ShowDetailed;
