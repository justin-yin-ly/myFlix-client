import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            image:"https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
            title:"Silence of the Lambs",
            genre:"Thriller",
            director:"Jonathan Demme",
            description:"A Young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer."
        },
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BMzg4MDJhMDMtYmJiMS00ZDZmLThmZWUtYTMwZDM1YTc5MWE2XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg",
            title:"Hot Fuzz",
            genre:"Action",
            director:"Edgar Wright",
            description:"A skilled London police officer, after irritating superiors with his embarrassing effectiveness, is transferred to a village where the easygoing officers object to his fervor for regulations, as a string of grisly murders strikes the town."
        },
        {
            id: 3,
            image:"https://m.media-amazon.com/images/M/MV5BMjE4ODI4Nzc3N15BMl5BanBnXkFtZTgwNTgwNDgwNzE@._V1_.jpg",
            title:"The Evil Dead",
            genre:"Horror",
            director:"Sam Raimi",
            description:"Five friends travel to a cabin in the woods, where they unknowingly release flesh-possessing demons."
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

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