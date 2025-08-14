import { Outlet } from "react-router";

export function User() {
  return (
    <div>
      <h1>Gerenciamento de usuários</h1>
      <Outlet />
    </div>
  );
}
