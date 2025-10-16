// src/sanity/env.ts
export const apiVersion = process.env.SANITY_STUDIO_API_VERSION || "2025-10-10";

export const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export const projectId = process.env.SANITY_STUDIO_PROJECT_ID;

// Optional helper for debugging during local dev
if (!projectId) {
  console.warn("⚠️ Sanity projectId is missing. Check your .env.local file.");
}
