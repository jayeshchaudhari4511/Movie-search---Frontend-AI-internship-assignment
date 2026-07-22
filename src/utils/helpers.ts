/**
 * Shared utility helpers
 */

/** Format a date string to a readable locale format */
export const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/** Truncate a string to `maxLength` characters and append "…" */
export const truncate = (str: string, maxLength: number): string =>
  str.length <= maxLength ? str : `${str.slice(0, maxLength)}…`;

/** Capitalise the first letter of a string */
export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

/** Generate a simple unique ID (not cryptographically secure) */
export const generateId = (): string =>
  Math.random().toString(36).slice(2, 11);

/** Deeply clone an object (no circular references) */
export const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));
