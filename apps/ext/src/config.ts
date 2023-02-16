// read this: https://vitejs.dev/guide/env-and-mode.html#env-files
const localServerOverride = import.meta.env.VITE_STELO_SERVER_URL;
export const serverUrl = import.meta.env.PROD
  ? "https://app.steloapi.com/"
  : localServerOverride || "http://localhost:3001/";

export const onboardingUrl = "https://onboarding.stelolabs.com";
