/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from "sanity/cli";
import dotenv from "dotenv";
dotenv.config();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  console.error("❌ Missing environment variables in sanity.cli.ts");
  console.error("Make sure .env file exists in the project root!");
  process.exit(1);
}

export default defineCliConfig({ api: { projectId, dataset } });
