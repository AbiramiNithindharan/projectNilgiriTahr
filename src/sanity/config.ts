export const apiVersion =
  process.env.SANITY_STUDIO_API_VERSION ||
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  "2025-10-10";

export const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";

export const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// optional debug
if (!projectId) {
  // eslint-disable-next-line no-console
  console.warn(
    "⚠️ Sanity studio projectId is missing. Check SANITY_STUDIO_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID."
  );
}
