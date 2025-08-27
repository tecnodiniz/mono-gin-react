import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/config/setup.ts",
    coverage: {
      reporter: ["text", "json", "html", "lcov"],
      exclude: ["node_modules/", "src/test/"],
    },
  },
});
