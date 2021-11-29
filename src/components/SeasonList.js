import React from 'react';
import Season from './Season';

const SeasonList = ({ seasonCount, episodes }) => {
  return (
    <div className="seasons">
      {Array(seasonCount)
        .fill(0)
        .map((season, index) => {
          return <Season season={index + 1} key={index} episodes={episodes} />;
        })}
    </div>
  );
};

export default SeasonList;
