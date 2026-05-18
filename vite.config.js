import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
const JSON_SERVER_TARGET =
  process.env.VITE_JSON_SERVER_URL ?? "http://localhost:5000";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: JSON_SERVER_TARGET,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
    include: ["src/**/*.{test,spec}.{js,jsx}"],
  },
});