import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserByIdQuery } from '../queries/useUserByIdQuery';
import { useMutation } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShowCard from '../components/ShowCard';
import ProfileCard from '../components/ProfileCard';
import { faUserPlus, faUserTimes } from '@fortawesome/free-solid-svg-icons';
const Profile = () => {
  const { id } = useParams();
  const { user, refresh, token } = useAuth();
  const { data, isLoading, error, isPreviousData } = useUserByIdQuery(id);

  const follow = useMutation(() =>
    axios
      .post(`http://localhost:8080/api/user/${id}/follow`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => refresh())
  );

  const unfollow = useMutation(() =>
    axios
      .post(`http://localhost:8080/api/user/${id}/unfollow`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => refresh())
  );

  if (isLoading) return 'Loading';

  const followed =
    user.followed && user.followed.some((followed) => followed.id == id);

  console.log(user.followed);
  return (
    <div className="profilePage">
      <div className="profilePanel">
        <div className="info">
          <img
            src={
              data.imageUrl ||
              'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png'
            }
            alt=""
          />
          <span>{data.name}</span>
        </div>
        {user.id != id ? (
          followed ? (
            <FontAwesomeIcon
              icon={faUserTimes}
              onClick={unfollow.mutate}
              title="Unfollow user"
            />
          ) : (
            <FontAwesomeIcon
              icon={faUserPlus}
              onClick={follow.mutate}
              title="Follow user"
            />
          )
        ) : null}
      </div>
      <span className="subtitle">Liked shows</span>
      <div className="list">
        {data.likedShows &&
          data.likedShows.map((show) => (
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
          ))}
      </div>
      <span className="subtitle">Followers</span>
      <div className="list">
        {data.followers &&
          data.followers.map((follower) => (
            <ProfileCard
              name={follower.name}
              imageUrl={follower.imageUrl}
              id={follower.id}
            />
          ))}
      </div>
      <span className="subtitle">Followed users</span>
      <div className="list">
        {data.followed &&
          data.followed.map((followed) => (
            <ProfileCard
              name={followed.name}
              imageUrl={followed.imageUrl}
              id={followed.id}
            />
          ))}
      </div>
    </div>
  );
};

export default Profile;
