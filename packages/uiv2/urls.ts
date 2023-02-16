const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://app.steloapi.com/"
    : "http://localhost:3001/";
const BASE_URL = new URL("api/v0/internal/", SERVER_URL);
export const TRANSACTION_URL = new URL("transaction", BASE_URL);
export const SIGNATURE_URL = new URL("signature", BASE_URL);
export const ANALYTICS_EVENT_URL = new URL("event", BASE_URL);
