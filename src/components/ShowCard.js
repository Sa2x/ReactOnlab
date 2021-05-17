import React from "react";
import { Link } from "react-router-dom";
import Image from "./Image";

const ShowCard = ({ show }) => {
  const { name, image, id, status, rating } = show;

  return (
    <Link to={`/show/${id}`} className="showCard">
      <div data-testid="showcard">
        <Image
          src={image && image.original}
          placeholderImg="https://media.istockphoto.com/photos/paper-cup-with-a-popcorn-on-white-picture-id1160441778?s=612x612"
        />
        <h3 className="title">{name}</h3>
        <h3 className="info">Status: {status}</h3>
        {rating && <h3 className="info">Rating: {rating}</h3>}
      </div>
    </Link>
  );
};

export default ShowCard;
