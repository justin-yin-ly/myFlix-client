import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({movies}) => {

  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId)

  return (
      <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>Title: {movie.title}</Card.Title>
        <Card.Text>Genre: {movie.genre}</Card.Text>
        <Card.Text>Directed By: {movie.director}</Card.Text>
        <Card.Text>Description: {movie.description}</Card.Text>
        <Link to={`/`}>
          <Button variant="link">
            Back
          </Button>
        </Link>
      </Card.Body>
      </Card>
  );
};
