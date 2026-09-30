/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Address of the hosted backend, e.g. https://painter-api.azurewebsites.net */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
