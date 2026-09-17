import styles from "./HomePage.module.css";
import SearchInput from "../../components/ui/SearchInput/SearchInput.tsx";
import {useState} from "react";
import type {MovieItem, OMDbResponse} from "../../types/OMDbTypes.ts";
import MovieCard from "../../components/ui/MovieCard/MovieCard.tsx";
import MovieModal from "../../components/ui/MovieModal/MovieModal.tsx";

const viteomdapikey = import.meta.env.VITE_OMD_API_KEY;

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<MovieItem[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<MovieItem | null>(null);

    const fetchSearch = async (query: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://www.omdbapi.com/?apikey=${viteomdapikey}&s=${query}`
            )

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const data: OMDbResponse = await response.json();

            if (data.Response === 'False' || data.Search === undefined) {
                throw new Error(data.Error);
            } else {
                setSearchResults(data.Search)
            }
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

    const handleSearch = () => {
        fetchSearch(searchQuery);
    }

    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <h2>Movie Finder</h2>
                <SearchInput
                    query={searchQuery}
                    setQuery={setSearchQuery}
                    onSearch={handleSearch}
                />
            </header>
            <section className={styles.movieGrid}>
                {
                    isLoading && <div>Loading...</div>
                }
                {
                    error && <div>{error}</div>
                }
                {
                    !isLoading && !error && searchResults.length > 0 && searchResults.map(result => (
                        <MovieCard
                            key={result.imdbID}
                            movie={result}
                            setSelectedMovie={setSelectedMovie}
                        />
                    ))
                }
            </section>
            {selectedMovie &&
                <MovieModal
                    closeModal={() => setSelectedMovie(null)}
                    movie={selectedMovie}
                />
            }
        </div>
    );
};

export default HomePage;