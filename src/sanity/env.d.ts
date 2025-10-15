/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NEXT_PUBLIC_SANITY_PROJECT_ID: string;
  readonly NEXT_PUBLIC_SANITY_DATASET: string;
  readonly NEXT_PUBLIC_SANITY_API_VERSION: string;
  readonly SANITY_STUDIO_PROJECT_ID: string;
  readonly SANITY_STUDIO_DATASET: string;
  readonly SANITY_STUDIO_API_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
