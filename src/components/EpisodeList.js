import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchTvShowEpisodesById } from "../api/fetchTvShowEpisodesById";
import Episode from "../components/Episode";

const EpisodeList = ({ seasonNumber }) => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(["showepisodes", id], () =>
    fetchTvShowEpisodesById(id)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div> Error message: + {error.mesage}</div>;
  return (
    <div className="episodes">
      {data
        .filter((episode) => episode.season === seasonNumber)
        .map((episode) => {
          return <Episode episode={episode} />;
        })}
    </div>
  );
};

export default EpisodeList;
