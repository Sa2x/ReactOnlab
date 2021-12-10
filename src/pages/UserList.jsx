import React from 'react';
import ProfileCard from '../components/ProfileCard';
import { useUserQuery } from '../queries/useUserQuery';
const UserList = () => {
  const { data, isLoading, error, isPreviousData } = useUserQuery();
  if (isLoading) return 'Loading';
  return (
    <div className="users">
      {data.map((user) => (
        <ProfileCard name={user.name} imageUrl={user.imageUrl} id={user.id} />
      ))}
    </div>
  );
};

export default UserList;
