import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import ShowList from "./pages/showlist/ShowList";
import ShowDetailed from "./pages/ShowDetailed";
import ShowFavourites from "./pages/ShowFavoruites";
import SnackBarProvider from "react-simple-snackbar";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <SnackBarProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/shows">
                <ShowList />
              </Route>
              <Route exact path="/show/:id">
                <ShowDetailed />
              </Route>
              <Route exact path="/favourites">
                <ShowFavourites />
              </Route>
            </Switch>
          </Layout>
        </QueryClientProvider>
      </SnackBarProvider>
    </div>
  );
}

export default App;
