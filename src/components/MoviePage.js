import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeUserName } from "../actions/userActions";
import { initialLoading, setLoading } from "../actions/loadingActions";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import Loader from "./Loader/Loader";
import MovieCard from "./MovieCard";
import NoMoviesFound from "./NoMoviesFound";

export default function MoviePage() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  const dispatch = useDispatch();
  const userName = useSelector((state) => state.userName);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    const getDefaultMovies = async () => {
      setLoading(dispatch);
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=Dark Knight`,
        {
          headers: { Accept: "application/json" },
        }
      );
      const parsedData = await response.json();
      setMovies(parsedData.Search);
      initialLoading(dispatch);
    };
    getDefaultMovies();
  }, []);

  const getMovies = async () => {
    setLoading(dispatch);
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`,
      {
        headers: { Accept: "application/json" },
      }
    );
    const parsedData = await response.json();
    if (parsedData) {
      setMovies(parsedData.Search);
      console.log(parsedData.Search);
    } else {
      setMovies([]);
    }
    initialLoading(dispatch);
  };

  return (
    <div className="main-page-content">
      <h1 className="main-header">Moviflix</h1>

      <button onClick={() => changeUserName(dispatch)} type="submit">
        Press this and my name appears!!
      </button>
      <h3>{userName}</h3>
      <h3 className="sub-header">User, try searching for any Movie</h3>
      <Form
        className="search-form"
        onSubmit={(e) => {
          e.preventDefault();
          getMovies();
        }}
      >
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search Movies"
            aria-label="Search Movies"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            required
          />
          <InputGroup.Append>
            <Button type="submit" variant="secondary">
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      {!movies ? (
        <NoMoviesFound />
      ) : loading ? (
        <Loader />
      ) : (
        <Row className="movie-container">
          {movies.map((movie) => {
            return (
              <Col
                key={movie.imdbID}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-4"
              >
                <MovieCard movies={movie} />
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
}
