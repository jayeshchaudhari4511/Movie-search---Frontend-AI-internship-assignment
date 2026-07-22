import { useState, useEffect } from "react";
import type { OmdbMovie } from "../types";
import { searchMovies } from "../api/movieService";
import useDebounce from "./useDebounce";

interface UseMovieSearchResult {
  movies: OmdbMovie[];
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
}

/**
 * useMovieSearch – debounced OMDb search hook.
 *
 * @param query - Raw search string from the input
 * @returns     { movies, loading, error, hasSearched }
 *
 * @example
 * const { movies, loading, error, hasSearched } = useMovieSearch(query);
 */
const useMovieSearch = (query: string): UseMovieSearchResult => {
  const [movies, setMovies] = useState<OmdbMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useDebounce(
    () => {
      const trimmed = query.trim();

      if (!trimmed) {
        setMovies([]);
        setError(null);
        setHasSearched(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setHasSearched(true);

      searchMovies(trimmed)
        .then((results: OmdbMovie[]) => {
          setMovies(results);
        })
        .catch((err: unknown) => {
          setMovies([]);
          setError(
            err instanceof Error
              ? err.message
              : "An unexpected error occurred. Please try again."
          );
        })
        .finally(() => setLoading(false));
    },
    500,
    [query]
  );

  // Reset immediately when the query is fully cleared
  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setError(null);
      setHasSearched(false);
    }
  }, [query]);

  return { movies, loading, error, hasSearched };
};

export default useMovieSearch;
