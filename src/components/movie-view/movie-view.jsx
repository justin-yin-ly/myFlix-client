import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({movies, user, setUser, token}) => {

  const [favorited, setFavorited] = useState(false);

  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId)

  useEffect(() => {
    if(user.favoriteMovies && user.favoriteMovies.includes(movie.id))
    {
      setFavorited(true);
    }
  }, []);

  const addToFavorite = () => {
    fetch("https://cinedata-05d7865bba09.herokuapp.com/users/" + user.username + "/favorites/" + movie.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => response.json())
        .then((data) => {
          if(data)
          {
            console.log(data);
            setFavorited(true);
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            alert("Movie added to favorites!");
          }
        });
  };

  const removeFromFavorite = () => {
    fetch("https://cinedata-05d7865bba09.herokuapp.com/users/" + user.username + "/favorites/" + movie.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => response.json())
        .then((data) => {
          if(data)
          {
            console.log(data);
            setFavorited(false);
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            alert("Movie removed from favorites!");
          }
        });
  };

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
        <>
        {
          favorited ? 
          (
            <Button onClick={removeFromFavorite}>Remove from Favorites</Button>
          ) : 
          (
            <Button onClick={addToFavorite}>Add to Favorites</Button>
          )
        }
        </>

      </Card.Body>
      </Card>
  );
};
