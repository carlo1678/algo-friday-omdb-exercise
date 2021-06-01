import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MoviePage from "./components/MoviePage";
import MoviesList from "./components/MoviesList";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/moviesList">Movies List</Link>
          </nav>
        </div>
        <Route exact path="/">
          <MoviePage />
        </Route>
        <Route path="/moviesList">
          <MoviesList />
        </Route>
      </Router>
    </div>
  );
}

export default App;
