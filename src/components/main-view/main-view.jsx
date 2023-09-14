import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }

        //fetch("https://cinedata-05d7865bba09.herokuapp.com/movies", {
        //    headers: { Authorization: `Bearer ${token}` },
        //})
        //    .then((response) => response.json())
        //    .then((movies) => {
        //        setMovies(movies);
        //    });

        var genreDict = {};
        fetch("https://cinedata-05d7865bba09.herokuapp.com/genres", {
            headers: { Authorization: `Bearer ${token}`},
        })
        .then((response) => response.json())
        .then((data) => {
            for(let i = 0; i < data.length; i++)
            {
                genreDict[data[i]._id] = data[i].name;
            }
        })
        ;

        var directorDict = {};  
        fetch("https://cinedata-05d7865bba09.herokuapp.com/directors", {
            headers: { Authorization: `Bearer ${token}`},
        })
        .then((response) => response.json())
        .then((data) => {
            for(let i = 0; i < data.length; i++)
            {
                directorDict[data[i]._id] = data[i].name;
            }
        })
        ;

        fetch("https://cinedata-05d7865bba09.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}`},
        })
        .then((response) => response.json())
        .then((data) => {
            const moviesFromAPI = data.map((movie) => {
                return {
                    id: movie._id,
                    image: movie.imagePath,
                    title: movie.title,
                    genre: genreDict[movie.genre.genreID],
                    director: directorDict[movie.director.directorID],
                    description: movie.description
                };
            });

            setMovies(moviesFromAPI);
        });

    }, [token]);

    return (
        <Row className="justify-content-md-center">
          {!user ? (
            <Col md={5}>
              <LoginView onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
                }
               }/>
              or
              <SignupView />
            </Col>
          ) : selectedMovie ? (
            <Col md={8}>
              <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
              />
            </Col>
          ) : movies.length === 0 ? (
            <div>The list is empty!</div>
          ) : (
            <>
              {movies.map((movie) => (
                <Col className="mb-5" key={movie.id} md={3}>
                  <MovieCard
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                      setSelectedMovie(newSelectedMovie);
                    }}
                  />
                </Col>
              ))}
              <div>
              <Button className="mb-4 logout" variant="primary" type="submit" onClick={() => { 
                setUser(null); setToken(null); localStorage.clear(); 
                }
                }>
                  Logout
              </Button>
              </div>
            </>
          )}
        </Row>
      );
};