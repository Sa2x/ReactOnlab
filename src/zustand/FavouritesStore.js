import { filter } from "lodash";
import create from "zustand";
import { persist } from "zustand/middleware";

export const useFavouritesStore = create(
  persist(
    (set) => ({
      favourites: [],
      addFavourite: (favourite) =>
        set((state) => ({
          ...state,
          favourites: [...state.favourites, favourite],
        })),
      removeFavourite: (favourite) =>
        set((state) => ({
          favourites: state.favourites.filter(({ id }) => id !== favourite.id),
        })),
    }),
    {
      name: "favourite-series",
    }
  )
);
