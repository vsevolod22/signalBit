/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SMARTCAPTCHA_CLIENT_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
