import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useAuth } from './AuthContext';

const NotificationContext = React.createContext({});

const NotificationProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const sse = new EventSource(
        `http://localhost:8080/api/user/${user.id}/subscribe`
      );

      sse.onmessage = (e) => {
        console.log(e.data);
        enqueueSnackbar(e.data, 5000);
      };

      sse.onerror = (e) => console.log(e);
      return () => {
        sse.close();
        axios.post('http://localhost:8080/api/user/unsubscribe', sse);
      };
    }
  }, [user]);

  return (
    <NotificationContext.Provider>{children}</NotificationContext.Provider>
  );
};

export { NotificationProvider };
