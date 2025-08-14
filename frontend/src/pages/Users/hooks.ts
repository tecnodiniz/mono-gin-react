import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { users } from "../../services/users";
import type { UserUpdate } from "../../services/users/types";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => users.getUsers().then((res) => res.data),
  });
}
export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => users.getUserById(id).then((res) => res.data),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: users.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UserUpdate }) =>
      users.updateUser(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      queryClient.invalidateQueries({ queryKey: ["users"], exact: true });
    },
  });
}
