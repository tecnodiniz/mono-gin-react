type Timezone = {
  timezone: string;
};

export enum Roles {
  ADMIN = "admin",
  MANAGER = "manager",
  TESTER = "tester",
}
export interface User {
  id: string;
  username: string;
  password: string;
  preferences: Timezone;
  roles: Roles[];
  active: boolean;
  created_ts: number;
}

export type UserFields = keyof User;
export type UserUpdate = Partial<Omit<User, "id" | "created_ts">>;
