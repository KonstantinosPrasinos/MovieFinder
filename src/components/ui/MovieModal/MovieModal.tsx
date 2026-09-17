import styles from "./MovieModal.module.css";
import {useEffect, useState} from "react";
import type {OMDbResponse} from "../../../types/OMDbTypes.ts";

interface MovieModalProps {
    movieId: string;
}

const viteomdapikey = import.meta.env.VITE_OMD_API_KEY;

const MovieModal = ({movieId}: MovieModalProps) => {
    const [movieDetails, setMovieDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchMovieDetails = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `http://www.omdbapi.com/?apikey=${viteomdapikey}&i=${movieId}`
                )

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const data = await response.json();

                console.log(data)
            } catch (error) {
                let errorMessage = `An error occurred while fetching results`;

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
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.curtain}></div>
            <div className={styles.content}>

            </div>
        </div>
    );
};

export default MovieModal;