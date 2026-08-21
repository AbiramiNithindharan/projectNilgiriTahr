import { projectId } from "@/sanity/config";

/**
 * Ends the Sanity session on this browser. Studio stores its credentials one of
 * two ways depending on auth mode, so clear both: the cookie session on
 * api.sanity.io, and the token Studio keeps in localStorage.
 *
 * The network call needs this origin to be in the project's CORS allowlist with
 * credentials enabled — the same setting that lets Studio log in at all — so it
 * is best-effort and never blocks the local cleanup.
 */
export async function endSanitySession() {
  try {
    await fetch(`https://${projectId}.api.sanity.io/v1/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    console.error("⚠️ Sanity session logout failed (continuing):", err);
  }

  try {
    Object.keys(window.localStorage)
      .filter(
        (k) =>
          k.startsWith("__studio_auth_token_") ||
          k.startsWith("__sanity_auth_token_"),
      )
      .forEach((k) => window.localStorage.removeItem(k));
  } catch (err) {
    console.error("⚠️ Could not clear Sanity token from localStorage:", err);
  }
}
