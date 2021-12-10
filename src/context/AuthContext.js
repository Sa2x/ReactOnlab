import { getSuggestedQuery } from '@testing-library/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (token) {
      getUser();
    } else {
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem('token');
      setToken(token);
    }
  }, []);

  const getUser = async () => {
    console.log(token);
    await axios
      .get('http://localhost:8080/api/user/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) =>
        setUser({
          id: response.data.id,
          name: response.data.name,
          likedShows: response.data.likedShows,
          imageUrl: response.data.imageUrl,
          followed: response.data.followed,
        })
      )
      .catch((error) => {
        enqueueSnackbar('Failed registration:' + error.response, 5000);
      });
  };

  const register = async (userName, password, email, file) => {
    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('password', password);
    formData.append('email', email);
    if (file) formData.append('profilePicture', file);
    console.log(file);
    console.log(formData);
    await axios
      .post('http://localhost:8080/api/user/register', formData)
      .then((response) => enqueueSnackbar('Succesful registration', 5000))
      .catch((error) => {
        enqueueSnackbar('Failed registration:' + error.response, 5000);
      });
  };

  const login = async (password, email) =>
    await axios
      .post('http://localhost:8080/api/user/login', { email, password }, {})
      .then((response) => {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        enqueueSnackbar('Succesful login', 5000);
        history.push('/');
        return response;
      })
      .catch((error) => {
        enqueueSnackbar('Failed login:' + error.response, 5000);
      });

  const refresh = () => getUser();

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ register, login, user, logout, token, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
