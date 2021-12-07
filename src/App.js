import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home/Home';
import { QueryClient, QueryClientProvider } from 'react-query';
import ShowList from './pages/showlist/ShowList';
import ShowDetailed from './pages/ShowDetailed';
import ShowFavourites from './pages/ShowFavoruites';
import SnackBarProvider from 'react-simple-snackbar';
import { ReactQueryDevtools } from 'react-query/devtools';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

import { AuthProvider } from './context/AuthContext';
import Unathenticated from './pages/Unathenticated';
import GuardedRoute from './components/GuardedRoute';
import UserList from './pages/UserList';

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <SnackBarProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
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
          </AuthProvider>
        </QueryClientProvider>
      </SnackBarProvider>
    </div>
  );
}

export default App;
