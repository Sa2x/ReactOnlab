import React, { useState } from "react";
import EpisodeList from "./EpisodeList";

const Season = ({ season }) => {
  const [open, setOpen] = useState(false);

  const changeHandle = () => {
    setOpen((previous) => !previous);
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <h5>{`Season ${season.number}`}</h5>
        <p onClick={changeHandle}>+</p>
      </div>
      <div>{open && <EpisodeList seasonNumber={season.number} />}</div>
    </>
  );
};

export default Season;
