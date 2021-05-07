import React from "react";
import { Link } from "react-router-dom";
import Image from "./Image";

const ShowCard = ({ show }) => {
  const { name, image, id, status, rating } = show;

  return (
    <Link to={`/show/${id}`} className="showCard">
      <div>
        {console.log(show)}
        <Image
          src={image && image.original}
          placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load"
        />
        <h3 className="title">{name}</h3>
        <h3 className="info">Status: {status}</h3>
        <h3 className="info">Rating: {rating}</h3>
      </div>
    </Link>
  );
};

export default ShowCard;
