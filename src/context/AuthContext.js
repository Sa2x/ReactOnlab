import axios from 'axios';
import React, { useContext } from 'react';

const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const register = async (userName, password, email, file) => {
    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('profilePicture', file);
    console.log(file);
    console.log(formData);
    await axios.post('http://localhost:8080/api/user/register', formData, {
      crossdomain: true,
    });
  };

  const login = async (password, email) => {
    await axios.post(
      'http://localhost:8080/api/user/register',
      { email, password },
      {}
    );
  };
  return (
    <AuthContext.Provider value={{ register }}>{children}</AuthContext.Provider>
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
