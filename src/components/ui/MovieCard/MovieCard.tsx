import type {MovieItem} from "../../../types/OMDbTypes.ts";
import styles from "./MovieCard.module.css";

interface MovieCardProps {
    movie: MovieItem;
}

const MovieCard = ({movie}: MovieCardProps) => {
    return (
        <div className={styles.container}>
            {movie.Poster !== 'N/A' ? (
                <img src={movie.Poster} className={styles.posterImage} alt={`${movie.Title} poster`} />
            ) : (
                <div className="no-poster-placeholder">No image available</div>
            )}
            <div className={styles.movieTextContents}>
                <div>
                    {movie.Title}
                </div>
                <div className={styles.movieYear}>
                    {movie.Year}
                </div>
            </div>
        </div>
    );
};

export default MovieCard;