import styles from "./SearchInput.module.css"
import  {type Dispatch, type SetStateAction} from "react";
import {IconSearch} from "@tabler/icons-react";
import * as React from "react";

interface SearchBarProps {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    onSearch: () => void;
}

const SearchInput = ({ query, setQuery, onSearch }: SearchBarProps) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <div className={styles.inputContainer}>
            <input
                type={"text"}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={"Search"}
                onKeyDown={handleKeyDown}
            />
            <button
                className={styles.searchButton}
                onClick={onSearch}
            >
                <IconSearch size={20} />
            </button>
        </div>
    );
};

export default SearchInput;