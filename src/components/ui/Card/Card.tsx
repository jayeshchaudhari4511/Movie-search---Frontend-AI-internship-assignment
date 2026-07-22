import React from "react";
import type { HTMLAttributes } from "react";
import styles from "./Card.module.css";

// ── Types ────────────────────────────────────────────────────────────────────
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  noPadding?: boolean;
}

// ── Component ────────────────────────────────────────────────────────────────
const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  footer,
  noPadding = false,
  children,
  className = "",
  ...rest
}) => {
  return (
    <div
      className={[styles.card, className].filter(Boolean).join(" ")}
      {...rest}
    >
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}

      <div className={[styles.body, noPadding ? styles.noPadding : ""].join(" ")}>
        {children}
      </div>

      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};

export default Card;
