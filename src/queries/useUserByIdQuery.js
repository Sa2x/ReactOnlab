import { useQuery } from 'react-query';
import { fetchUserById } from '../api/fetchUserById';

export const useUserByIdQuery = (id) => {
  const { data, isLoading, error, isPreviousData } = useQuery(
    ['users', id],
    () => fetchUserById(id),
    { keepPreviousData: true }
  );
  return { data, isLoading, error, isPreviousData };
};
