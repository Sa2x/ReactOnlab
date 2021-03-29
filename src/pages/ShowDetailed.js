import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchTvShowById } from "../api/fetchTvShowbyId";
import SeasonList from "../components/SeasonList";

const ShowDetailed = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(["show", id], () =>
    fetchTvShowById(id)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div> Error message: + {error.mesage}</div>;
  return (
    <div>
      {console.log(data)}
      <h3>{data.name}</h3>
      <SeasonList />
    </div>
  );
};

export default ShowDetailed;
