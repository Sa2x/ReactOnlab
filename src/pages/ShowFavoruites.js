import React from 'react';
import { useFavouritesStore } from '../zustand/FavouritesStore';
import ShowCard from '../components/ShowCard';
import { useAuth } from '../context/AuthContext';

const ShowFavourites = () => {
  const { user } = useAuth();
  const favourites = user.likedShows;

  return (
    <div className="shows">
      {favourites &&
        favourites.length > 0 &&
        favourites.map((show) => {
          return (
            <ShowCard
              key={show.id}
              show={{
                name: show.name,
                image: show.imgSrc,
                id: show.apiId,
                status: show.status,
                rating: show.rating,
              }}
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
