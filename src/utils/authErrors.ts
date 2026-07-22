/**
 * Maps Firebase Authentication error codes to user-friendly messages.
 * @see https://firebase.google.com/docs/auth/admin/errors
 */
const AUTH_ERROR_MAP: Record<string, string> = {
  // ── Sign-in errors ─────────────────────────────────────────────────────────
  "auth/invalid-credential":
    "Invalid email or password. Please check your credentials and try again.",
  "auth/wrong-password":
    "Incorrect password. Please try again or reset your password.",
  "auth/user-not-found":
    "No account found with this email. Please sign up first.",
  "auth/invalid-email": "The email address you entered is not valid.",
  "auth/user-disabled":
    "This account has been disabled. Please contact support.",
  "auth/too-many-requests":
    "Too many failed attempts. Your account is temporarily locked. Try again later.",

  // ── Sign-up errors ─────────────────────────────────────────────────────────
  "auth/email-already-in-use":
    "An account with this email already exists. Try logging in instead.",
  "auth/weak-password": "Password must be at least 6 characters long.",
  "auth/missing-password": "Please enter a password.",
  "auth/missing-email": "Please enter your email address.",
  "auth/operation-not-allowed":
    "Email/password sign-in is not enabled. Please contact support.",

  // ── Configuration errors ───────────────────────────────────────────────────
  "auth/invalid-api-key":
    "Firebase configuration error. Please contact support.",
  "auth/app-not-authorized":
    "This app is not authorized to use Firebase Authentication.",
  "auth/configuration-not-found":
    "Firebase Authentication is not configured for this project.",
  "auth/api-key-not-valid.-please-pass-a-valid-api-key.":
    "Firebase API key is invalid. Check your .env configuration.",
  "auth/project-not-found":
    "Firebase project not found. Check your .env configuration.",

  // ── Network errors ─────────────────────────────────────────────────────────
  "auth/network-request-failed":
    "A network error occurred. Please check your connection and try again.",

  // ── General ────────────────────────────────────────────────────────────────
  "auth/internal-error":
    "An internal error occurred. Please try again in a moment.",
  "auth/requires-recent-login":
    "Please log in again to complete this action.",
  "auth/popup-closed-by-user": "The sign-in popup was closed before completing.",
  "auth/cancelled-popup-request": "Only one sign-in popup can be open at a time.",
};

const DEFAULT_ERROR = "An unexpected error occurred. Please try again.";

/**
 * Extracts a user-friendly error message from a Firebase Auth error.
 *
 * @param error - The caught error (unknown type from try/catch).
 * @returns A human-readable error string.
 */
export function getAuthErrorMessage(error: unknown): string {
  if (
    error !== null &&
    typeof error === "object" &&
    "code" in error &&
    typeof (error as { code: unknown }).code === "string"
  ) {
    const code = (error as { code: string }).code;

    // Log the raw code in dev so unmapped codes are easy to spot
    if (import.meta.env.DEV) {
      console.error("[Firebase Auth Error]", code, error);
    }

    return AUTH_ERROR_MAP[code] ?? `${DEFAULT_ERROR} (code: ${code})`;
  }

  // Log non-Firebase errors too
  if (import.meta.env.DEV) {
    console.error("[Auth Error — no code]", error);
  }

  return DEFAULT_ERROR;
}
