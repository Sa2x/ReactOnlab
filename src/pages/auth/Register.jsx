import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const fileInputRef = useRef();
  const [formValues, setFormValues] = useState({
    userName: '',
    password: '',
    email: '',
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    register(
      formValues.userName,
      formValues.password,
      formValues.email,
      event.target.profilePicture.files[0] ?? null
    );
    setFormValues({
      userName: '',
      email: '',
      password: '',
    });
    fileInputRef.current.value = null;
  };
  return (
    <div className="auth-panel">
      <div className="form-container">
        <span>Register</span>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={formValues.userName}
            onChange={(event) =>
              setFormValues((values) => ({
                ...values,
                userName: event.target.value,
              }))
            }
          />
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            value={formValues.email}
            onChange={(event) =>
              setFormValues((values) => ({
                ...values,
                email: event.target.value,
              }))
            }
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={(event) =>
              setFormValues((values) => ({
                ...values,
                password: event.target.value,
              }))
            }
          />
          <input
            type="file"
            name="profilePicture"
            placeholder="Profile picture"
            ref={fileInputRef}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
