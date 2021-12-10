import React from 'react';
import Episode from '../components/Episode';

const EpisodeList = ({ seasonNumber, episodes }) => {
  return (
    <div className="episodes">
      {episodes
        .filter((episode) => episode.season === seasonNumber)
        .map((episode) => {
          return <Episode episode={episode} />;
        })}
    </div>
  );
};

export default EpisodeList;
