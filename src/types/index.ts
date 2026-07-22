// Shared TypeScript types used across the application

// ── User ─────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
  createdAt: string;
}

// ── API ───────────────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// ── Route ─────────────────────────────────────────────────────────────────────
export interface RouteConfig {
  path: string;
  label: string;
  protected: boolean;
}

// ── OMDb Movie Search ─────────────────────────────────────────────────────────
export interface OmdbMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: "movie" | "series" | "episode" | string;
  Poster: string;
}

export interface OmdbSearchResponse {
  Search: OmdbMovie[];
  totalResults: string;
  Response: "True" | "False";
  Error?: string;
}
