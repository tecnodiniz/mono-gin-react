import { type User, Roles, type UserUpdate } from "@/services/users/types";

// Factory principal para criar usuários
export const createMockUser = (overrides: Partial<User> = {}): User => ({
  id: `user-${Date.now()}`,
  username: "testuser",
  password: "hashedpassword123",
  preferences: { timezone: "UTC" },
  roles: [Roles.TESTER],
  active: true,
  created_ts: Date.now(),
  ...overrides,
});

// Factory para múltiplos usuários
export const createMockUsers = (count = 3): User[] =>
  Array.from({ length: count }, (_, index) =>
    createMockUser({
      id: `user-${index + 1}`,
      username: `user${index + 1}`,
      roles:
        index === 0
          ? [Roles.ADMIN]
          : index === 1
          ? [Roles.MANAGER]
          : [Roles.TESTER],
    })
  );

// Factory para dados de atualização
export const createMockUserUpdate = (
  overrides: Partial<UserUpdate> = {}
): UserUpdate => ({
  username: "updateduser",
  preferences: { timezone: "America/Sao_Paulo" },
  active: false,
  roles: [Roles.TESTER],
  ...overrides,
});

// Cenários pré-definidos
export const userScenarios = {
  admin: () =>
    createMockUser({
      id: "admin-1",
      username: "admin",
      roles: [Roles.ADMIN],
    }),

  manager: () =>
    createMockUser({
      id: "manager-1",
      username: "manager",
      roles: [Roles.MANAGER],
    }),

  inactiveUser: () =>
    createMockUser({
      id: "inactive-1",
      username: "inactive",
      active: false,
    }),

  newUser: () =>
    createMockUser({
      id: "",
      created_ts: 0,
    }),
};
