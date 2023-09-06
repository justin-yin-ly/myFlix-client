import PropTypes from "prop-types";

export const MovieView = ({movie,onBackClick}) => {
    return (
        <div>
            <div>
                <img src={movie.image} />
            </div>
            <div>
                <span>Title:</span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Genre:</span>
                <span>{movie.genre}</span>
            </div>
            <div>
                <span>Directed By:</span>
                <span>{movie.director}</span>
            </div>
            <div>
                <span>Description:</span>
                <span>{movie.description}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
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