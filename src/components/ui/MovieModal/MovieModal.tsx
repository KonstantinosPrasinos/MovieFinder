import styles from "./MovieModal.module.css";
import {useEffect, useMemo, useState} from "react";
import type {MovieItem} from "../../../types/OMDbTypes.ts";
import * as React from "react";
import {IconX} from "@tabler/icons-react";

interface MovieModalProps {
    movie: MovieItem;
    closeModal: () => void;
}

export interface MovieRating {
    Source: string;
    Value: string;
}

export interface MovieDetails {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: MovieRating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD?: string;
    BoxOffice?: string;
    Production?: string;
    Website?: string;
    Response: 'True' | 'False';
}

const viteomdapikey = import.meta.env.VITE_OMD_API_KEY;

const MovieModal = ({movie, closeModal}: MovieModalProps) => {
    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const detailEntries = useMemo(() => {
        const excludedKeys = new Set(['Poster', 'Response', 'Ratings', 'Title']);

        if (isLoading) return null
        if (error || movieDetails === null) return Object.entries(movie).filter(
            ([key, value]) => !excludedKeys.has(key) && value && value !== 'N/A'
        );
        return Object.entries(movieDetails).filter(
            ([key, value]) => !excludedKeys.has(key) && value && value !== 'N/A'
        );
    }, [error, isLoading, movie, movieDetails]);

    useEffect(() => {
        const controller = new AbortController();

        const fetchMovieDetails = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `http://www.omdbapi.com/?apikey=${viteomdapikey}&i=${movie.imdbID}`
                )

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const data: MovieDetails = await response.json();

                if (data.Response === 'False') {
                    throw new Error("");
                } else {
                    setMovieDetails(data);
                }
            } catch (error) {
                let errorMessage = `An error occurred while fetching movie details`;

                if (error instanceof Error) {
                    errorMessage += ` (${error.message})`;
                }

                setError(errorMessage);
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchMovieDetails();

        return () => {
            controller.abort();
        }
    }, [movie.imdbID])

    const handleCurtainClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        closeModal()
    }

    return (
        <div className={styles.container}>
            <div className={styles.curtain} onClick={handleCurtainClick}></div>
            <div className={styles.content}>
                {
                    isLoading && <div>Loading...</div>
                }
                {
                    error && <div>{error}</div>
                }
                {
                    !isLoading && !error && <div className={styles.details}>
                        <div className={styles.posterImage}>
                            {movie.Poster !== 'N/A' ? (
                                <img src={movie.Poster} className={styles.posterImage} alt={`${movie.Title} poster`} />
                            ) : (
                                <div className="no-poster-placeholder">No image available</div>
                            )}
                        </div>
                        <div className={styles.textDetails}>
                            <h3>{movie.Title}</h3>
                            {detailEntries && detailEntries.map(([key, value]) => (
                                <div key={key}>
                                    <span className={styles.detailLabel}>{key}: </span>
                                    <span className={styles.detailValue}>{String(value)}</span>
                                </div>
                            ))}
                        </div>
                        <button onClick={closeModal}>
                            <IconX></IconX>
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default React.memo(MovieModal);