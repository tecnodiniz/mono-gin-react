import { useForm } from "react-hook-form";
import { useParams } from "react-router";

import { Roles, type User, type UserUpdate } from "../../services/users/types";
import { useUpdateUser, useUser } from "./hooks";

export function UserUpdate() {
  const { id } = useParams();
  const { data: user, isLoading, isError } = useUser(id!);

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro ao carregar</div>;
  if (!user) return <div>Usuário não encontrado</div>;

  return <UserEditForm user={user} id={id!} />;
}

function UserEditForm({ user, id }: { user: User; id: string }) {
  const updateUser = useUpdateUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpdate>({
    defaultValues: (() => {
      const { id, created_ts, ...formData } = user;
      return formData;
    })(),
  });

  const onSubmit = handleSubmit((data) => {
    updateUser.mutate({ id, data });
  });

  return (
    <form onSubmit={onSubmit}>
      <input {...register("username", { required: true })} />
      {errors.username && <span>Campo obrigatório</span>}
      <input {...register("password", { required: true })} type="password" />
      {errors.password && <span>Campo obrigatório</span>}
      <input {...register("active")} type="checkbox" />

      <fieldset>
        <legend>Perfis</legend>
        {Object.values(Roles).map((role) => (
          <label key={role}>
            <input type="checkbox" value={role} {...register("roles")} />
            {role}
          </label>
        ))}
      </fieldset>

      <button type="submit">Salvar</button>
    </form>
  );
}
