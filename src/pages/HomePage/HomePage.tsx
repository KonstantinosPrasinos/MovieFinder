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
                console.error("Could not find any results.");
            }

            const data: OMDbResponse = await response.json();

            if (data.Response === 'False' || data.Search === undefined) {
                console.error(data.Response);
            } else {
                setSearchResults(data.Search)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSearch = (query: string) => {
        setSearchQuery(query);

        if (searchQuery.length < 3) return;

        fetchSearch(query);
    }

    return (
        <div className={styles.app}>
            <section className={styles.header}>
                <h2>Movie Finder</h2>
                <SearchInput
                    query={searchQuery}
                    onChange={handleSearch}
                />
            </section>
            <section className={styles.searchResults}>
                {
                    searchResults.length > 0 && (
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