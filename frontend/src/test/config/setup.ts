import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Adiciona matchers customizados do jest-dom
expect.extend(matchers);

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
