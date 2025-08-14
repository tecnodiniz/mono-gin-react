import { Link, useParams } from "react-router";
import { useUser } from "./hooks";
import { useEffect, useState } from "react";
import type { User } from "../../services/users/types";

export function ShowUser() {
  const { id } = useParams();
  const { data: user, isLoading, isError } = useUser(id || "");
  const [users, setUsers] = useState<User[]>();

  const fetchUsers = () => {
    return fetch("http://localhost:5000/v1/users").then((res) => res.json());
  };

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
  }, []);

  if (isLoading) return "carregando...";
  if (isError) return "erro";
  if (!user) return "Usuário não encontrado";

  return (
    <>
      <Link to="/users">Voltar</Link>
      {user.id}
      Hello user {user?.username} <br />
      {user.password}
      {user.active}
      {user.created_ts}
      {user.roles.map((role) => role)}
      <h1>Sem react query</h1>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </>
  );
}
