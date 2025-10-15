// src/sanity/env.ts
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-10-10";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// Optional helper for debugging during local dev
if (!projectId) {
  console.warn("⚠️ Sanity projectId is missing. Check your .env.local file.");
}
