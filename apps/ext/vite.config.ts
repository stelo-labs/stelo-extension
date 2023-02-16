import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        inspector: resolve(__dirname, "src/stelo.html"),
        appCode: resolve(__dirname, "src/RedesignAppMount.tsx"),
      },
    },
  },
  plugins: [vanillaExtractPlugin({}), react(), crx({ manifest })],
});
