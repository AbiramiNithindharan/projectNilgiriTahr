/**
 * Reads the readable `csrf_token` cookie set at admin login.
 * Browser-only — call from client components and send the value as the
 * `x-csrf-token` header on mutating admin requests, which `verifyCSRF()`
 * checks server-side.
 */
export function getCSRFToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrf_token="))
    ?.split("=")[1];
}
