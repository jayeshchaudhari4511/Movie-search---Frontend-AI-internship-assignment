import React, { useState } from "react";
import type { OmdbMovie } from "@/types";
import styles from "./MovieCard.module.css";

// ── Inline SVG fallback (no external dependency) ──────────────────────────────
const NoImageSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 300 445"
    className={styles.noImage}
    aria-hidden="true"
  >
    <rect width="300" height="445" fill="#1e1e2e" />
    <rect x="110" y="160" width="80" height="60" rx="8" fill="#2d2d44" />
    <circle cx="130" cy="178" r="10" fill="#6366f1" opacity="0.7" />
    <polygon points="150,168 170,180 150,192" fill="#6366f1" opacity="0.7" />
    <text
      x="150"
      y="260"
      textAnchor="middle"
      fill="#6b7280"
      fontSize="13"
      fontFamily="system-ui, sans-serif"
    >
      No Poster
    </text>
  </svg>
);

interface MovieCardProps {
  movie: OmdbMovie;
}

const TYPE_LABEL: Record<string, string> = {
  movie: "🎬 Movie",
  series: "📺 Series",
  episode: "🎞 Episode",
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [imgError, setImgError] = useState(false);
  const hasPoster = movie.Poster && movie.Poster !== "N/A" && !imgError;

  return (
    <article className={styles.card}>
      {/* ── Poster ─────────────────────────────────────────────────────── */}
      <div className={styles.posterWrap}>
        {hasPoster ? (
          <img
            src={movie.Poster}
            alt={`${movie.Title} poster`}
            className={styles.poster}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <NoImageSVG />
        )}

        {/* Gradient overlay for readability */}
        <div className={styles.overlay} />

        <span className={styles.typeBadge}>
          {TYPE_LABEL[movie.Type] ?? movie.Type}
        </span>
      </div>

      {/* ── Info ───────────────────────────────────────────────────────── */}
      <div className={styles.info}>
        <h3 className={styles.title} title={movie.Title}>
          {movie.Title}
        </h3>
        <div className={styles.meta}>
          <span className={styles.year}>📅 {movie.Year}</span>
          <a
            href={`https://www.imdb.com/title/${movie.imdbID}/`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.imdbLink}
            aria-label={`View ${movie.Title} on IMDb`}
          >
            IMDb ↗
          </a>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
