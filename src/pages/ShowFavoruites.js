import React from "react";
import { useFavouritesStore } from "../zustand/FavouritesStore";
import ShowCard from "../components/ShowCard";

const ShowFavourites = () => {
  const { favourites, addFavourite, removeFavourite } = useFavouritesStore();

  return (
    <div className="shows">
      {console.log(favourites)}
      {favourites &&
        favourites.length > 0 &&
        favourites.map((show) => {
          return (
            <ShowCard
              key={show.id}
              show={{ name: show.name, image: show.image, id: show.id }}
            />
          );
        })}
      {favourites && favourites.length === 0 && (
        <div>No favourite TV Shows chosen yet.</div>
      )}
    </div>
  );
};

export default ShowFavourites;
