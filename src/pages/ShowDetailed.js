import React, { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { replace, debounce, find } from "lodash";

import { fetchTvShowById } from "../api/fetchTvShowbyId";
import SeasonList from "../components/SeasonList";
import { useFavouritesStore } from "../zustand/FavouritesStore";
import Image from "../components/Image";

import { faStar as unfilledStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShowDetailed = () => {
  const history = useHistory();
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(["show", id], () =>
    fetchTvShowById(id)
  );

  const { favourites, addFavourite, removeFavourite } = useFavouritesStore();
  const [isFavourite, setIsFavourite] = useState(false);

  const addToFavourites = () => {
    addFavourite({
      id: id,
      name: data.name,
      image: data.image,
      status: data.status,
      rating: data.rating && data.rating.average,
    });
  };

  const removeFromFavourites = () => {
    removeFavourite({ id: id });
  };

  useEffect(() => {
    const isFav = !!find(favourites, ["id", id]);
    setIsFavourite(isFav);
  }, [favourites]);

  useHotkeys(
    "right",
    debounce(() => {
      history.replace("/");
      history.push(`/shows/${Number(id) + 1}`);
    }, 500)
  );

  useHotkeys(
    "left",
    debounce(() => {
      history.replace("/");
      history.push(`/shows/${Number(id) - 1}`);
    }, 500)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div> Error message: + {error.mesage}</div>;
  return (
    <div className="showDetailed">
      <div className="infoPanel">
        <Image
          src={data.image && data.image.original}
          placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load"
        />
        {console.log(data)}
        <div className="detailPanel">
          <div className="nameRow">
            <h3>{data.name}</h3>

            {!isFavourite && (
              <FontAwesomeIcon
                icon={unfilledStar}
                onClick={addToFavourites}
                title="Add to favourites"
              />
            )}
            {isFavourite && (
              <FontAwesomeIcon
                icon={filledStar}
                onClick={removeFromFavourites}
                title="Remove from favourites"
              />
            )}
          </div>
          <div className="genres">
            {data.genres.map((genre) => (
              <p>{genre}</p>
            ))}
          </div>

          <p
            style={
              data.status === "Ended"
                ? { fontWeight: "bold", color: "red" }
                : { fontWeight: "bold", color: "#05386b" }
            }
          >
            {data.status}
          </p>
          <p>
            Rating: {data.rating && data.rating.average && data.rating.average}
          </p>
          <p>{replace(replace(data.summary, `<p>`, ""), "</p>", "")}</p>
        </div>
      </div>
      <SeasonList />
    </div>
  );
};

export default ShowDetailed;
