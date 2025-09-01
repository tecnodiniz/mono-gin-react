import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { Roles, type User } from "../../services/users/types";
import { useCreateUser } from "./hooks";

export function UserCreate() {
  const { mutate: createUser, isPending } = useCreateUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      active: true,
      roles: [],
    },
  });
  const onSubmit = handleSubmit((data) => {
    createUser(data, {
      onSuccess: (res) => {
        console.log(res.data);
        navigate("/users");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  });

  if (isPending) return "Processando...";

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Usuário</label>
        <input
          id="username"
          type="text"
          {...register("username", { required: true })}
        />
        {errors.username && <span>Campo obrigatório</span>}

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>Campo obrigatório</span>}

        <label htmlFor="active">
          <input type="checkbox" {...register("active")} />
          Ativo
        </label>

        <fieldset>
          <legend>Perfis</legend>
          {Object.values(Roles).map((role) => (
            <label htmlFor="roles">
              <input type="checkbox" value={role} {...register("roles")} />
              {role}
            </label>
          ))}
        </fieldset>

        <input type="submit" value="Criar usuário" />
      </form>
    </div>
  );
}
