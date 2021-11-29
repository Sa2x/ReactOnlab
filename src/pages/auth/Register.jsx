import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const { register } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    register(
      event.target.userName.value,
      event.target.password.value,
      event.target.email.value,
      event.target.profilePicture.files[0]
    );
  };
  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <input type="text" name="userName" placeholder="Username" />
      <input type="text" name="email" placeholder="E-mail" />
      <input type="text" name="password" placeholder="Password" />
      <input type="file" name="profilePicture" placeholder="Profile picture" />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
