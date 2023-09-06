import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://cinedata-05d7865bba09.herokuapp.com/movies")
        .then((response) => response.json())
        .then((data) => {
            const moviesFromAPI = data.map((movie) => {
                return {
                    id: movie._id,
                    image: movie.imagePath,
                    title: movie.title,
                    genre: movie.genre.genreID,
                    director: movie.director.directorID,
                    description: movie.description
                };
            });

            setMovies(moviesFromAPI);
        });

    }, []);

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
    );
};