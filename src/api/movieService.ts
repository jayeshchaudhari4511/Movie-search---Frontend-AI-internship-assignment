import type { OmdbMovie, OmdbSearchResponse } from "@/types";

const BASE_URL = "https://www.omdbapi.com";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY as string;

/**
 * Search movies, series, or episodes via the OMDb API.
 *
 * @param query - Title to search for
 * @returns     Array of matching movies (empty array when nothing found)
 * @throws      Error with a user-readable message on network/API failure
 */
export async function searchMovies(query: string): Promise<OmdbMovie[]> {
  if (!query.trim()) return [];

  const url = `${BASE_URL}/?s=${encodeURIComponent(query.trim())}&apikey=${API_KEY}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Network error (${res.status}). Please try again.`);
  }

  const data: OmdbSearchResponse = await res.json();

  if (data.Response === "False") {
    // "Movie not found!" is a normal empty-results case, not an error
    if (data.Error === "Movie not found!") return [];
    throw new Error(data.Error ?? "Search failed. Please try again.");
  }

  return data.Search;
}
