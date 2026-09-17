import styles from "./SearchInput.module.css"

interface SearchBarProps {
    query: string;
    onChange: (query: string) => void;
}

const SearchInput = ({ query, onChange }: SearchBarProps) => {
    return (
        <div className={styles.inputContainer}>
            <input
                type={"text"}
                value={query}
                onChange={(e) => onChange(e.target.value)}
                placeholder={"Search"}
            />
            <button>
                Search
            </button>
        </div>
    );
};

export default SearchInput;