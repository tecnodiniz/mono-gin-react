import api from "../axios";
import type { User, UserUpdate } from "./types";

const ENDPOINTS = Object.freeze({
  users: "users",
  newUser: "users/new",
  userById: (id: string) => `users/${id}`,
});

export const users = {
  getUsers: () => api.get<User[]>(ENDPOINTS.users),
  createUser: (data: User) => api.post<User>(ENDPOINTS.newUser, data),
  getUserById: (id: string) => api.get<User>(ENDPOINTS.userById(id)),
  updateUser: (id: string, data: UserUpdate) =>
    api.put<User>(ENDPOINTS.userById(id), data),
};
