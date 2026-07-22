import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { OmdbMovie } from "@/types";
import MovieCard from "@/components/ui/MovieCard";
import useMovieSearch from "../../hooks/useMovieSearch";
import styles from "./Movies.module.css";

// ── Skeleton placeholder ──────────────────────────────────────────────────────
const SkeletonCard: React.FC = () => (
  <div className={styles.skeleton} aria-hidden="true">
    <div className={styles.skeletonPoster} />
    <div className={styles.skeletonInfo}>
      <div className={styles.skeletonLine} />
      <div className={`${styles.skeletonLine} ${styles.skeletonLineShort}`} />
    </div>
  </div>
);

// ── Movies page ───────────────────────────────────────────────────────────────
const Movies: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const { movies, loading, error, hasSearched } = useMovieSearch(query);

  // Sync URL param → input when navigating from Home
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) setSearchParams({ q: val.trim() });
    else setSearchParams({});
  };

  const showSkeletons = loading;
  const showEmpty = !loading && hasSearched && movies.length === 0 && !error;
  const showResults = !loading && movies.length > 0;

  return (
    <div className={styles.page}>

      {/* ── Search header ────────────────────────────────────────────────── */}
      <header className={styles.searchHeader}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            id="movie-search-input"
            type="search"
            className={styles.searchInput}
            placeholder="Search movies, series, episodes…"
            value={query}
            onChange={handleChange}
            autoComplete="off"
            aria-label="Search movies"
          />
          {query && (
            <button
              className={styles.clearBtn}
              onClick={() => { setQuery(""); setSearchParams({}); }}
              aria-label="Clear search"
              type="button"
            >
              ✕
            </button>
          )}
        </div>
      </header>

      {/* ── States ──────────────────────────────────────────────────────── */}
      <section className={styles.results} aria-live="polite" aria-busy={loading}>

        {/* Loading — skeleton grid */}
        {showSkeletons && (
          <div className={styles.grid} aria-label="Loading results">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className={styles.stateBox} role="alert">
            <span className={styles.stateIcon}>⚠️</span>
            <h2 className={styles.stateTitle}>Something went wrong</h2>
            <p className={styles.stateMsg}>{error}</p>
          </div>
        )}

        {/* Empty */}
        {showEmpty && (
          <div className={styles.stateBox}>
            <span className={styles.stateIcon}>🔍</span>
            <h2 className={styles.stateTitle}>No results found</h2>
            <p className={styles.stateMsg}>
              Nothing matched <strong>"{query}"</strong>. Try a different title.
            </p>
          </div>
        )}

        {/* Idle */}
        {!loading && !hasSearched && !error && (
          <div className={styles.stateBox}>
            <span className={styles.stateIcon}>🍿</span>
            <h2 className={styles.stateTitle}>What are you watching tonight?</h2>
            <p className={styles.stateMsg}>
              Start typing above to search the OMDb database.
            </p>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <>
            <p className={styles.resultCount}>
              <span className={styles.resultCountAccent}>{movies.length}</span>{" "}
              result{movies.length !== 1 ? "s" : ""} for <strong>"{query}"</strong>
            </p>
            <div className={styles.grid}>
              {movies.map((movie: OmdbMovie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Movies;
