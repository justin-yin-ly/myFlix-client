import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

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

    if (!user) {
        return (
            <>
                <LoginView 
                   onLoggedIn={(user, token) => {
                      setUser(user) ;
                      setToken(token);
                  }} />
                 
                or

                <SignupView />
            </>
        )
    }

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}/>
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty.</div>
    }

    return (
        <div>
            <div>
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                    />
                ))}
            </div>
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </div>
    );
};