import { Link } from "react-router";
import { useUsers } from "./hooks";

export function UserList() {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <div>Carregando usuários...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      <Link to="new">Adicionar</Link>

      <table border={1}>
        <thead>
          <tr>
            <th>Usuário</th>
            <th>Perfis</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.roles.join(", ")}</td>
              <td>{user.active ? "Ativo" : "Inativo"}</td>
              <td>
                <Link to={user.id}>Ver</Link>
                <Link to={`edit/${user.id}`}>Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
