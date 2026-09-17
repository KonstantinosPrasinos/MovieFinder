import styles from "./HomePage.module.css";

const HomePage = () => {
    return (
        <div className={styles.app}>
            <section className={styles.header}>
                <h2>Movie Finder</h2>
            </section>
        </div>
    );
};

export default HomePage;