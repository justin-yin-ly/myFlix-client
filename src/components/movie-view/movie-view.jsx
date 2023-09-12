import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieView = ({movie,onBackClick}) => {
    return (


        <Card className="h-100">
        <Card.Img variant="top" src={movie.image} />
        <Card.Body>
          <Card.Title>Title: {movie.title}</Card.Title>
          <Card.Text>Genre: {movie.genre}</Card.Text>
          <Card.Text>Directed By: {movie.director}</Card.Text>
          <Card.Text>Description: {movie.description}</Card.Text>
          <Button onClick={onBackClick} variant="link">
            Back
          </Button>
        </Card.Body>
        </Card>
    )
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.string,
        image: PropTypes.string,
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
}