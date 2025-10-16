// src/lib/sanityClient.ts
import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "@/sanity/config";

console.log("Sanity client build check:", { projectId, dataset, apiVersion });

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
});

export default client;
