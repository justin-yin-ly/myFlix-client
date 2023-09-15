import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);

    const [movies, setMovies] = useState([]);

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
      <BrowserRouter>
<NavigationBar
  user={user}
  onLoggedOut={() => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  }}
/>
<Row className="justify-content-md-center">
  <Routes>
    <Route
      path="/signup"
      element={
        <>
          {user ? (
            <Navigate to="/" />
          ) : (
            <Col md={5}>
              <SignupView />
            </Col>
          )}
        </>
      }
    />
    <Route
      path="/login"
      element={
        <>
          {user ? (
            <Navigate to="/" />
          ) : (
            <Col md={5}>
              <LoginView onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }} />
            </Col>
          )}
        </>
      }
    />

<Route
      path="/profile"
      element={
        <>
          {!user ? (
            <Navigate to="/login" replace />
          ) : (
            <Col className="mb-4" md={8}>
              <ProfileView user={user} token={token} setUser={setUser} movies={movies}/>
            </Col>
            )
          }
        </>
      }
    />

    <Route
      path="/movies/:movieId"
      element={
        <>
          {!user ? (
            <Navigate to="/login" replace />
          ) : movies.length === 0 ? (
            <Col>The list is empty!</Col>
          ) : (
            <Col md={8}>
              <MovieView movies={movies} user={user} token={token} setUser={setUser}/>
            </Col>
          )}
        </>
      }
    />
    <Route
      path="/"
      element={
        <>
          {!user ? (
            <Navigate to="/login" replace />
          ) : movies.length === 0 ? (
            <Col>The list is empty!</Col>
          ) : (
            <>
              {movies.map((movie) => (
                <Col className="mb-4" key={movie.id} md={3}>
                  <MovieCard movie={movie}/>
                </Col>
              ))}
            </>
          )}
        </>
      }
    />
  </Routes>
</Row>
</BrowserRouter>
      );
};