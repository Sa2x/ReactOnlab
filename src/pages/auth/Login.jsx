import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [formValues, setFormValues] = useState({
    password: 'sasasasa',
    email: 'sasa@sasa.com',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const succes = login(formValues.password, formValues.email);
    setFormValues({
      email: '',
      password: '',
    });
    if (succes) {
      console.log(succes);
      console.log('jeeejjjj');
    }
  };

  return (
    <div className="auth-panel">
      <div className="form-container">
        <span>Login</span>
        <form onSubmit={handleSubmit}>
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

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
