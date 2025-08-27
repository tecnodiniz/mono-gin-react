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
    // Incluir apenas arquivos que devem ser testados
    include: [
      "src/**/*.{test,spec}.{js,ts,jsx,tsx}",
      "src/test/**/*.test.{js,ts,jsx,tsx}",
    ],
    // Excluir arquivos que não devem ser testados
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
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      // Incluir apenas código que deve ter cobertura
      include: [
        "src/components/**/*.{ts,tsx}",
        "src/hooks/**/*.{ts,tsx}",
        "src/services/**/*.{ts,tsx}",
        "src/utils/**/*.{ts,tsx}",
        "src/pages/**/*.{ts,tsx}",
        // Incluir App.tsx se contiver lógica de negócio
        "src/App.tsx",
      ],
      // Excluir do coverage
      exclude: [
        "node_modules/",
        "src/test/**",
        "src/assets/**",
        "src/**/*.d.ts",
        "src/main.tsx",
        "src/**/*.css",
        "src/**/*.stories.{ts,tsx}",
        "src/**/*.config.{ts,tsx}",
        // Excluir arquivos apenas de tipos/interfaces
        "src/**/types.{ts,tsx}",
        "src/**/interfaces.{ts,tsx}",
        // Excluir arquivos de configuração específicos
        "src/**/constants.{ts,tsx}",
      ],
      // Configurar thresholds mínimos
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
        // Thresholds específicos por pasta se necessário
        // "src/components/": {
        //   branches: 85,
        //   functions: 85,
        //   lines: 85,
        //   statements: 85,
        // },
        // "src/services/": {
        //   branches: 90,
        //   functions: 90,
        //   lines: 90,
        //   statements: 90,
        // },
      },
    },
  },
});
