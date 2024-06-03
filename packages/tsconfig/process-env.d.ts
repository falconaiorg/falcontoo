declare namespace NodeJS {
  export interface ProcessEnv {
    ANTHROPIC_API_KEY: string;
    DATABASE_URL_DEV: string;
    DIRECT_URL_DEV: string;
    DO_SPACES_ACCESS_KEY: string;
    DO_SPACES_BUCKET: string;
    DO_SPACES_CDN_ENDPOINT: string;
    DO_SPACES_ENDPOINT: string;
    DO_SPACES_SECRET_KEY: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GROQ_API_KEY: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    NEXT_PUBLIC_API_ENDPOINT: string;
    OPENAI_API_KEY: string;
    QDRANT_API_KEY: string;
    QDRANT_URL: string;
    EXPRESS_LOCAL_PORT: string;
  }
}
