import { vi } from "vitest";
import type { AxiosResponse } from "axios";

export const mockApi = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  patch: vi.fn(),
};

vi.mock("@/services/axios", () => ({
  default: mockApi,
}));
export const createMockResponse = <T>(
  data: T,
  status = 200,
  statusText = "OK"
): AxiosResponse<T> => ({
  data,
  status,
  statusText,
  headers: {},
  config: {} as any,
});

export const createMockError = (status = 500, message = "Server Error") => {
  const error = new Error(message) as any;
  error.response = {
    status,
    statusText: message,
    data: { message },
    headers: {},
    config: {},
  };
  error.isAxiosError = true;
  return error;
};

export const resetApiMocks = () => {
  Object.values(mockApi).forEach((mock) => mock.mockReset());
};

export const clearApiMocks = () => {
  Object.values(mockApi).forEach((mock) => mock.mockClear());
};
