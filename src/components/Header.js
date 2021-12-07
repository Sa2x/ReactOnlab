import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  return (
    <div className="header">
      <div className="pageroutes">
        <Link
          to="/"
          className="item"
          style={pathname === '/' ? { backgroundColor: '#5cdb85' } : {}}
        >
          Home
        </Link>
        {user && (
          <>
            <Link
              to="/shows"
              className="item"
              style={
                pathname === '/shows' ? { backgroundColor: '#5cdb85' } : {}
              }
            >
              TV Shows
            </Link>
            <Link
              to="/favourites"
              className="item"
              style={
                pathname === '/favourites' ? { backgroundColor: '#5cdb85' } : {}
              }
            >
              Favourites
            </Link>
            <Link
              to="/users"
              className="item"
              style={
                pathname === '/users' ? { backgroundColor: '#5cdb85' } : {}
              }
            >
              Users
            </Link>
            <button className="item" onClick={logout}>
              Logout
            </button>
          </>
        )}
        {!user && (
          <>
            <Link
              to="/register"
              className="item"
              style={
                pathname === '/register' ? { backgroundColor: '#5cdb85' } : {}
              }
            >
              Register
            </Link>
            <Link
              to="/login"
              className="item"
              style={
                pathname === '/login' ? { backgroundColor: '#5cdb85' } : {}
              }
            >
              Login
            </Link>
          </>
        )}
      </div>
      {user && (
        <Link to={`/profiles/${user.id}`} className="profile">
          <img
            src={
              user.imageUrl ||
              'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png'
            }
            alt=""
          />
          <span>{user.name}</span>
        </Link>
      )}
    </div>
  );
};

export default Header;
