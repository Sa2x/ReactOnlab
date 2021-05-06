import React, { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { debounce, find } from "lodash";

import { fetchTvShowById } from "../api/fetchTvShowbyId";
import SeasonList from "../components/SeasonList";
import { useFavouritesStore } from "../zustand/FavouritesStore";
import Image from "../components/Image";

const ShowDetailed = () => {
  const history = useHistory();
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(["show", id], () =>
    fetchTvShowById(id)
  );

  const { favourites, addFavourite, removeFavourite } = useFavouritesStore();
  const [isFavourite, setIsFavourite] = useState(false);

  const addToFavourites = () => {
    console.log(data);
    addFavourite({ id: id, name: data.name, image: data.image });
  };

  const removeFromFavourites = () => {
    removeFavourite({ id: id });
  };

  useEffect(() => {
    const isFav = !!find(favourites, ["id", id]);
    setIsFavourite(isFav);
  }, [favourites]);

  useHotkeys(
    "d",
    debounce(() => {
      history.replace("/");
      history.push(`/shows/${Number(id) + 1}`);
    }, 500)
  );

  useHotkeys(
    "a",
    debounce(() => {
      history.replace("/");
      history.push(`/shows/${Number(id) - 1}`);
    }, 500)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div> Error message: + {error.mesage}</div>;
  return (
    <div>
      {!isFavourite && (
        <button onClick={addToFavourites}>Add to favourites</button>
      )}
      {isFavourite && (
        <button onClick={removeFromFavourites}>Remove from favourites</button>
      )}

      <h3>{data.name}</h3>
      <Image
        src={data.image && data.image.original}
        placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load"
      />
      <SeasonList />
    </div>
  );
};

export default ShowDetailed;
