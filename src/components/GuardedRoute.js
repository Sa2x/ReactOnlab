import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GuardedRoute = (props) => {
  const { user } = useAuth();

  if (!user) {
    return <Redirect to="/unauthenticated" />;
  }
  return (
    <Route exact={props.exact} path={props.path}>
      {props.children}
    </Route>
  );
};

export default GuardedRoute;
