import React, { useState } from "react";
import EpisodeList from "./EpisodeList";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Season = ({ season }) => {
  const [open, setOpen] = useState(false);

  const changeHandle = () => {
    setOpen((previous) => !previous);
  };
  return (
    <>
      <div className="season">
        <h5>{`Season ${season.number}`}</h5>
        {/* <p onClick={changeHandle}>+</p> */}
        {!open && (
          <FontAwesomeIcon icon={faChevronDown} onClick={changeHandle} />
        )}
        {open && <FontAwesomeIcon icon={faChevronUp} onClick={changeHandle} />}
      </div>
      {open && <EpisodeList seasonNumber={season.number} />}
    </>
  );
};

export default Season;
