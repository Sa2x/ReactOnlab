import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="header">
      <Link
        to="/"
        className="item"
        style={pathname === "/" ? { backgroundColor: "#5cdb85" } : {}}
      >
        Home
      </Link>
      <Link
        to="/shows"
        className="item"
        style={pathname === "/shows" ? { backgroundColor: "#5cdb85" } : {}}
      >
        TV Shows
      </Link>
      <Link
        to="/favourites"
        className="item"
        style={pathname === "/favourites" ? { backgroundColor: "#5cdb85" } : {}}
      >
        Favourites
      </Link>
    </div>
  );
};

export default Header;
