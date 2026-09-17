import styles from "./HomePage.module.css";
import SearchInput from "../../components/ui/SearchInput/SearchInput.tsx";
import {useState} from "react";

interface MovieItem {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

interface OMDbResponse {
    Response: 'True' | 'False';
    Search?: MovieItem[];
    totalResults?: string;
    Error?: string;
}

const viteomdapikey = import.meta.env.VITE_OMD_API_KEY;

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<MovieItem[]>([]);

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
        if (searchQuery.length < 3) return;

        fetchSearch(searchQuery);
    }

    return (
        <div className={styles.app}>
            <section className={styles.header}>
                <h2>Movie Finder</h2>
                <SearchInput
                    query={searchQuery}
                    setQuery={setSearchQuery}
                    onSearch={handleSearch}
                />
            </section>
            <section className={styles.searchResults}>
                {
                    isLoading && <div>Loading...</div>
                }
                {
                    error && <div>An error occurred: {error}</div>
                }
                {
                    !isLoading && !error && searchResults.length > 0 && (
                        <div>
                            {searchResults.map((result) => (
                                <div key={result.imdbID}>
                                    {result.Title}
                                </div>
                            ))}
                        </div>
                    )
                }
            </section>
        </div>
    );
};

export default HomePage;