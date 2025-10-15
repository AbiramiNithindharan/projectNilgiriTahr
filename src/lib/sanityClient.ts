import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.SANITY_STUDIO_API_VERSION || "2025-10-10", // use ISO date string
  useCdn: process.env.NODE_ENV === "production" || false,
});

export default client;
