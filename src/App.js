import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home/Home';
import { QueryClient, QueryClientProvider } from 'react-query';
import ShowList from './pages/showlist/ShowList';
import ShowDetailed from './pages/ShowDetailed';
import ShowFavourites from './pages/ShowFavoruites';
import { SnackbarProvider } from 'notistack';
import { ReactQueryDevtools } from 'react-query/devtools';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Unathenticated from './pages/Unathenticated';
import GuardedRoute from './components/GuardedRoute';
import UserList from './pages/UserList';
import Profile from './pages/Profile';

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <NotificationProvider>
              <Layout>
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <GuardedRoute exact path="/shows">
                    <ShowList />
                  </GuardedRoute>
                  <GuardedRoute exact path="/show/:id">
                    <ShowDetailed />
                  </GuardedRoute>
                  <GuardedRoute exact path="/favourites">
                    <ShowFavourites />
                  </GuardedRoute>
                  <GuardedRoute exact path="/users">
                    <UserList />
                  </GuardedRoute>
                  <GuardedRoute exact path="/profiles/:id">
                    <Profile />
                  </GuardedRoute>
                  <Route exact path="/register">
                    <Register />
                  </Route>
                  <Route exact path="/login">
                    <Login />
                  </Route>
                  <Route exact path="/unauthenticated">
                    <Unathenticated />
                  </Route>
                </Switch>
              </Layout>
              <ReactQueryDevtools />
            </NotificationProvider>
          </AuthProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
