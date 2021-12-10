import React from 'react';
import { Link } from 'react-router-dom';

const ProfileCard = ({ name, imageUrl, id }) => {
  return (
    <Link to={`/profiles/${id}`}>
      <div className="user-card">
        <img
          src={
            imageUrl ||
            'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png'
          }
          alt=""
          className="user-image"
        />
        <span>{name}</span>
      </div>
    </Link>
  );
};

export default ProfileCard;
