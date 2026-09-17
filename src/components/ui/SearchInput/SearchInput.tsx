import styles from "./SearchInput.module.css"
import type {Dispatch, SetStateAction} from "react";

interface SearchBarProps {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    onSearch: () => void;
}

const SearchInput = ({ query, setQuery, onSearch }: SearchBarProps) => {
    return (
        <div className={styles.inputContainer}>
            <input
                type={"text"}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={"Search"}
            />
            <button onClick={onSearch}>
                Search
            </button>
        </div>
    );
};

export default SearchInput;