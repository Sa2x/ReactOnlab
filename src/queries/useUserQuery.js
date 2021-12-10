import { useQuery } from 'react-query';
import { fetchUsers } from '../api/fetchUsers';

export const useUserQuery = () => {
  const { data, isLoading, error, isPreviousData } = useQuery(
    ['users'],
    () => fetchUsers(),
    { keepPreviousData: true }
  );
  return { data, isLoading, error, isPreviousData };
};
