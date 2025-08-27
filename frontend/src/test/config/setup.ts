import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Adiciona matchers customizados do jest-dom
expect.extend(matchers);

Object.defineProperty(import.meta, "env", {
  value: {
    VITE_API_URL: "http://localhost:5000/api",
    NODE_ENV: "test",
    ...import.meta.env,
  },
});
global.fetch = vi.fn(() =>
  Promise.reject(new Error("❌ Fetch real bloqueado em testes!"))
);

// Limpa após cada teste
afterEach(() => {
  cleanup();
});

beforeAll(() => {
  console.log("✅ Iniciando testes...");
});

afterAll(() => {
  console.log("🏁 Finalizou todos os testes");
});

// Mock global de console.error para testes mais limpos
const originalError = console.error;
beforeAll(() => {
  console.error = vi.fn();
});

afterAll(() => {
  console.error = originalError;
});
