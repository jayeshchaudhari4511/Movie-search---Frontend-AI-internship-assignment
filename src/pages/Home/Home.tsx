import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const FEATURED = [
  { emoji: "🎬", label: "Movies" },
  { emoji: "📺", label: "Series" },
  { emoji: "🏆", label: "Award Winners" },
  { emoji: "🔥", label: "Trending" },
];

const QUICK_SEARCHES = [
  "Avengers", "Batman", "Inception", "Breaking Bad",
  "The Dark Knight", "Interstellar", "Game of Thrones",
];

const Home: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/movies?q=${encodeURIComponent(query.trim())}`);
  };

  const handleQuick = (term: string) => {
    navigate(`/movies?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className={styles.page}>
      {/* ── Cinematic Hero ─────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />

        <div className={styles.heroContent}>
          <div className={styles.badge}>🎬 Powered by OMDb API</div>

          <h1 className={styles.heroTitle}>
            Discover Your Next<br />
            <span className={styles.heroAccent}>Favourite Movie</span>
          </h1>

          <p className={styles.heroSub}>
            Search millions of movies, TV series, and episodes.
            Find cast, ratings, and IMDb links — all in one place.
          </p>

          {/* ── Search Bar ─────────────────────────────────────────────── */}
          <form className={styles.searchForm} onSubmit={handleSearch}>
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                id="home-search-input"
                type="search"
                className={styles.searchInput}
                placeholder="Search movies, series, episodes…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
                aria-label="Search movies"
              />
              <button
                type="submit"
                className={styles.searchBtn}
                disabled={!query.trim()}
                aria-label="Search"
              >
                Search
              </button>
            </div>
          </form>

          {/* ── Quick Searches ──────────────────────────────────────────── */}
          <div className={styles.quickWrap}>
            <span className={styles.quickLabel}>Popular:</span>
            <div className={styles.quickTags}>
              {QUICK_SEARCHES.map((term) => (
                <button
                  key={term}
                  className={styles.quickTag}
                  onClick={() => handleQuick(term)}
                  type="button"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Chips ─────────────────────────────────────────────── */}
      <section className={styles.categories}>
        {FEATURED.map(({ emoji, label }) => (
          <button
            key={label}
            className={styles.catCard}
            onClick={() => handleQuick(label)}
            type="button"
          >
            <span className={styles.catEmoji}>{emoji}</span>
            <span className={styles.catLabel}>{label}</span>
          </button>
        ))}
      </section>

      {/* ── Feature Highlights ─────────────────────────────────────────── */}
      <section className={styles.features}>
        <div className={styles.featureCard}>
          <span className={styles.featureIcon}>⚡</span>
          <h3 className={styles.featureTitle}>Instant Search</h3>
          <p className={styles.featureSub}>Results as you type — debounced and lightning fast.</p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.featureIcon}>🎭</span>
          <h3 className={styles.featureTitle}>Movies & Series</h3>
          <p className={styles.featureSub}>Find anything from blockbusters to cult classics.</p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.featureIcon}>🔗</span>
          <h3 className={styles.featureTitle}>IMDb Links</h3>
          <p className={styles.featureSub}>Jump straight to IMDb for ratings, trailers and more.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
