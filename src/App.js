import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import ShowList from "./pages/ShowList";
import ShowDetailed from "./pages/ShowDetailed";
import ShowFavourites from "./pages/ShowFavoruites";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/shows">
                <ShowList />
              </Route>
              <Route exact path="/shows/:id">
                <ShowDetailed />
              </Route>
              <Route exact path="/favourites">
                <ShowFavourites />
              </Route>
            </Switch>
          </Layout>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
