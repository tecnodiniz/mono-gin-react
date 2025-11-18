import { memo } from "react";
import type { User } from "@/services/users/types";

interface ListProps {
  users: User[];
  onClick?: () => void;
}

const UserList = memo(function UserList({ users, onClick }: ListProps) {
  console.log("UserList renderizado");
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
      <button onClick={onClick}>List Action</button>
    </>
  );
});

export default UserList;
