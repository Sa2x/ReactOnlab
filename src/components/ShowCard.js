import { motion, useMotionValue } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import Image from "./Image";

const ShowCard = ({ show }) => {
  const { name, image, id } = show;
  const x = useMotionValue(0);

  return (
    <Link to={`/shows/${id}`}>
      <div className="showcard">
        <Image
          src={image && image.original}
          placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load"
        />
        {/* <img src={show.image.original} alt={show.image && show.image.medium} /> */}
        <h3 className="title">{name}</h3>
      </div>
    </Link>
  );
};

export default ShowCard;
