import React from "react";
import { fetchTvShowSeasonsById } from "../api/fetchTvShowSeasonsById";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Season from "./Season";

const SeasonList = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(["showseasons", id], () =>
    fetchTvShowSeasonsById(id)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div> Error message: + {error.mesage}</div>;
  return (
    <div>
      {data.map((season) => (
        <Season season={season} key={season.id} />
      ))}
    </div>
  );
};

export default SeasonList;
