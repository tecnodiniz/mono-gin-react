import { describe, it, expect, beforeEach } from "vitest";
import {
  mockApi,
  createMockResponse,
  createMockError,
  resetApiMocks,
} from "@/test/utils/api-mocks";

import { users } from "./index";

import {
  createMockUser,
  createMockUsers,
  createMockUserUpdate,
  userScenarios,
} from "@/test/fixtures/user-fixture";

describe("Mock Validation", () => {
  it("should confirm axios is mocked", () => {
    expect(vi.isMockFunction(mockApi.get)).toBe(true);
    expect(vi.isMockFunction(mockApi.post)).toBe(true);
    console.log("✅ Axios está mockado corretamente");
  });
});

describe("Users Service", () => {
  beforeEach(() => {
    resetApiMocks();
  });

  describe("getUsers", () => {
    it("should fetch all users successfully", async () => {
      // Arrange
      const mockUsers = createMockUsers(3);
      mockApi.get.mockResolvedValue(createMockResponse(mockUsers));

      // Act
      const response = await users.getUsers();

      // Assert
      expect(mockApi.get).toHaveBeenCalledWith("users");
      expect(mockApi.get).toHaveBeenCalledTimes(1);
      expect(response.data).toEqual(mockUsers);
      expect(response.data).toHaveLength(3);
      expect(response.status).toBe(200);
    });

    it("should handle empty user list", async () => {
      // Arrange
      mockApi.get.mockResolvedValue(createMockResponse([]));

      // Act
      const response = await users.getUsers();

      // Assert
      expect(response.data).toEqual([]);
      expect(response.data).toHaveLength(0);
    });

    // it("should handle server error (500)", async () => {
    //   // Arrange
    //   mockApi.get.mockRejectedValue(
    //     createMockError(500, "Internal Server Error")
    //   );

    //   // Act & Assert
    //   await expect(users.getUsers()).rejects.toMatchObject({
    //     response: {
    //       status: 500,
    //       statusText: "Internal Server Error",
    //     },
    //   });
    //   expect(mockApi.get).toHaveBeenCalledWith("users");
    // });

    // it("should handle network error", async () => {
    //   // Arrange
    //   mockApi.get.mockRejectedValue(new Error("Network Error"));

    //   // Act & Assert
    //   await expect(users.getUsers()).rejects.toThrow("Network Error");
    // });
  });

  //   describe("createUser", () => {
  //     it("should create user successfully", async () => {
  //       // Arrange
  //       const newUser = userScenarios.newUser();
  //       const createdUser = createMockUser({ ...newUser, id: "new-user-id" });
  //       mockApi.post.mockResolvedValue(createMockResponse(createdUser, 201));

  //       // Act
  //       const response = await users.createUser(newUser);

  //       // Assert
  //       expect(mockApi.post).toHaveBeenCalledWith("users", newUser);
  //       expect(response.status).toBe(201);
  //       expect(response.data.id).toBe("new-user-id");
  //       expect(response.data.username).toBe(newUser.username);
  //     });

  //     it("should handle validation error (400)", async () => {
  //       // Arrange
  //       const invalidUser = createMockUser({ username: "" });
  //       mockApi.post.mockRejectedValue(
  //         createMockError(400, "Username is required")
  //       );

  //       // Act & Assert
  //       await expect(users.createUser(invalidUser)).rejects.toMatchObject({
  //         response: { status: 400 },
  //       });
  //     });

  //     it("should handle duplicate user error (409)", async () => {
  //       // Arrange
  //       const duplicateUser = createMockUser({ username: "existing-user" });
  //       mockApi.post.mockRejectedValue(
  //         createMockError(409, "User already exists")
  //       );

  //       // Act & Assert
  //       await expect(users.createUser(duplicateUser)).rejects.toMatchObject({
  //         response: { status: 409 },
  //       });
  //     });
  //   });

  //   describe("getUserById", () => {
  //     it("should fetch user by id successfully", async () => {
  //       // Arrange
  //       const userId = "user-123";
  //       const mockUser = createMockUser({ id: userId });
  //       mockApi.get.mockResolvedValue(createMockResponse(mockUser));

  //       // Act
  //       const response = await users.getUserById(userId);

  //       // Assert
  //       expect(mockApi.get).toHaveBeenCalledWith(`users/${userId}`);
  //       expect(response.data.id).toBe(userId);
  //       expect(response.status).toBe(200);
  //     });

  //     it("should handle user not found (404)", async () => {
  //       // Arrange
  //       const userId = "non-existent-id";
  //       mockApi.get.mockRejectedValue(createMockError(404, "User not found"));

  //       // Act & Assert
  //       await expect(users.getUserById(userId)).rejects.toMatchObject({
  //         response: { status: 404 },
  //       });
  //       expect(mockApi.get).toHaveBeenCalledWith(`users/${userId}`);
  //     });

  //     it("should handle invalid user id format", async () => {
  //       // Arrange
  //       const invalidId = "";
  //       mockApi.get.mockRejectedValue(createMockError(400, "Invalid user ID"));

  //       // Act & Assert
  //       await expect(users.getUserById(invalidId)).rejects.toMatchObject({
  //         response: { status: 400 },
  //       });
  //     });
  //   });

  //   describe("updateUser", () => {
  //     it("should update user successfully", async () => {
  //       // Arrange
  //       const userId = "user-123";
  //       const updateData = createMockUserUpdate({ username: "updated-username" });
  //       const updatedUser = createMockUser({ id: userId, ...updateData });
  //       mockApi.put.mockResolvedValue(createMockResponse(updatedUser));

  //       // Act
  //       const response = await users.updateUser(userId, updateData);

  //       // Assert
  //       expect(mockApi.put).toHaveBeenCalledWith(`users/${userId}`, updateData);
  //       expect(response.data.username).toBe("updated-username");
  //       expect(response.data.id).toBe(userId);
  //     });

  //     it("should handle partial update", async () => {
  //       // Arrange
  //       const userId = "user-123";
  //       const partialUpdate = { active: false };
  //       const updatedUser = createMockUser({ id: userId, active: false });
  //       mockApi.put.mockResolvedValue(createMockResponse(updatedUser));

  //       // Act
  //       const response = await users.updateUser(userId, partialUpdate);

  //       // Assert
  //       expect(mockApi.put).toHaveBeenCalledWith(
  //         `users/${userId}`,
  //         partialUpdate
  //       );
  //       expect(response.data.active).toBe(false);
  //     });

  //     it("should handle unauthorized update (403)", async () => {
  //       // Arrange
  //       const userId = "protected-user";
  //       const updateData = createMockUserUpdate();
  //       mockApi.put.mockRejectedValue(createMockError(403, "Forbidden"));

  //       // Act & Assert
  //       await expect(users.updateUser(userId, updateData)).rejects.toMatchObject({
  //         response: { status: 403 },
  //       });
  //     });
  //   });

  //   describe("error scenarios", () => {
  //     it("should handle timeout errors", async () => {
  //       // Arrange
  //       const timeoutError = new Error("Timeout");
  //       timeoutError.name = "TimeoutError";
  //       mockApi.get.mockRejectedValue(timeoutError);

  //       // Act & Assert
  //       await expect(users.getUsers()).rejects.toThrow("Timeout");
  //     });

  //     it("should handle connection refused", async () => {
  //       // Arrange
  //       const connectionError = createMockError(0, "Connection refused");
  //       mockApi.get.mockRejectedValue(connectionError);

  //       // Act & Assert
  //       await expect(users.getUsers()).rejects.toMatchObject({
  //         response: { status: 0 },
  //       });
  //     });
  //   });
});
