import { Link, useParams } from "react-router";
import { useUser } from "./hooks";
import { useEffect, useState } from "react";
import type { User } from "../../services/users/types";

export function ShowUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    setTimeout(() => {
      setUsers(
        (prev) =>
          [
            ...prev,
            {
              id: "1",
              username: "user1",
              password: "pass1",
              active: true,
              created_ts: "",
              roles: ["admin"],
            },
            {
              id: "2",
              username: "user2",
              password: "pass2",
              active: false,
              created_ts: "",
              roles: ["user"],
            },
          ] as User[]
      );

      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return "carregando...";

  return (
    <>
      <h1>Sem api</h1>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </>
  );
}
