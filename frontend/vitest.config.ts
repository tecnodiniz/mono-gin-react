import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/config/setup.ts",
    include: [
      "src/**/*.{test,spec}.{js,ts,jsx,tsx}",
      "src/test/**/*.test.{js,ts,jsx,tsx}",
    ],
    exclude: [
      "node_modules/",
      "src/test/fixtures/**",
      "src/test/utils/**",
      "src/test/config/**",
      "src/assets/**",
      "src/**/*.d.ts",
      "src/main.tsx",
      "src/**/*.css",
    ],
    coverage: {
      provider: "istanbul", // 🔄 mais estável para gerar lcov
      reporter: ["text", "json", "html", "lcov"],
      reportsDirectory: "./coverage",
      all: true, // força gerar cobertura de todos os arquivos
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "node_modules/",
        "src/test/**",
        "src/assets/**",
        "src/**/*.d.ts",
        "src/main.tsx",
        "src/**/*.css",
        "src/**/*.stories.{ts,tsx}",
        "src/**/*.config.{ts,js}",
        "src/**/types.{ts,tsx}",
        "src/**/interfaces.{ts,tsx}",
        "src/**/constants.{ts,tsx}",
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
});
