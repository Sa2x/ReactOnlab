import { replace } from "lodash";
import React from "react";

const Episode = ({ episode }) => {
  return (
    <div className="episode">
      <h3>{episode.name}</h3>
      <h5>Episode {episode.number}</h5>
      {console.log(episode)}
      {/* {episode.summary.replace("/<p>/g", "").replace(/</p>/g, "")} */}
      <p>{replace(replace(episode.summary, "<p>", ""), "</p>", "")}</p>
    </div>
  );
};

export default Episode;
