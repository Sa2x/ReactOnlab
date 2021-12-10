import { useQuery } from "react-query";
import { fetchTvShows } from "../../api/fetchTvShows";

export const useShowQuery = (page, search) => {
  const { data, isLoading, error, isPreviousData } = useQuery(
    ["shows", page, search],
    () => fetchTvShows(Number(page) - 1, search),
    { keepPreviousData: true }
  );
  return { data, isLoading, error, isPreviousData };
};
