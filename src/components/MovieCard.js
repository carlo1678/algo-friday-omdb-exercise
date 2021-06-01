import React from "react";
import { Card } from "react-bootstrap";

export default function MovieCard(props) {
  const { Title, Year, Poster } = props.movies;
  return (
    <Card className="movie-card">
      <Card.Img className="movie-card-img" variant="top" src={Poster} alt="" />
      <Card.Body>
        <Card.Title className="card-title">{Title}</Card.Title>
        <Card.Text className="card-year">{Year}</Card.Text>
      </Card.Body>
    </Card>
  );
}
