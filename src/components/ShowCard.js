import React from "react";
import { Link } from "react-router-dom";

const ShowCard = ({ show }) => {
  return (
    <Link to={`/shows/${show.id}`}>
      <div className="showcard">
        <img
          src={show.image && show.image.original}
          alt={show.image && show.image.medium}
        />
        <h3>{show.name}</h3>
      </div>
    </Link>
  );
};

export default ShowCard;
