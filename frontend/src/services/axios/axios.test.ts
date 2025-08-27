// src/services/axios/axios.test.ts
import api from "./index";

describe("Axios Configuration", () => {
  it("should have correct base configuration", () => {
    expect(api.defaults.baseURL).toBe(import.meta.env.VITE_API_URL);
    expect(api.defaults.timeout).toBe(10000);
    expect(api.defaults.headers["Content-Type"]).toBe("application/json");
  });
});
