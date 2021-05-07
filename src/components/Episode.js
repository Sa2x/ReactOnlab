import { replace } from "lodash";
import React from "react";

const Episode = ({ episode }) => {
  return (
    <div>
      <h5>{episode.name}</h5>
      {/* {episode.summary.replace("/<p>/g", "").replace(/</p>/g, "")} */}
      <p>{replace(replace(episode.summary, "<p>", ""), "</p>", "")}</p>
    </div>
  );
};

export default Episode;
