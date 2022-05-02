import type { ActionData } from "~/routes/auth.register";
import FormInput from "./FormInput";

interface Props {
  data?: ActionData;
  searchParams?: string;
}

export default function SignUp({ data, searchParams }: Props) {
  return (
    <div className="card__container">
      <h3 className="title">Registrar</h3>
      <p className="subtitle">Cadastre-se com seu usuario e senha</p>
      <form
        method="post"
        action="/authentication/register"
        className="signup__form"
      >
        <div>
          <FormInput
            id="username"
            label="Usuario"
            name="username"
            defaultValue={data?.fields?.username}
            aria-invalid={Boolean(data?.fieldErrors?.username)}
            aria-errormessage={
              data?.fieldErrors?.username ? "username-error" : undefined
            }
            required
          />
          {data?.fieldErrors?.username ? (
            <p
              className="form-validation-error"
              role="alert"
              id="username-error"
            >
              {data.fieldErrors.username}
            </p>
          ) : null}
        </div>
        <div>
          <FormInput
            id="password"
            type="password"
            label="Senha"
            name="password"
            defaultValue={data?.fields?.password}
            aria-invalid={Boolean(data?.fieldErrors?.password) || undefined}
            aria-errormessage={
              data?.fieldErrors?.password ? "password-error" : undefined
            }
            required
          />
          {data?.fieldErrors?.password ? (
            <p
              className="form-validation-error"
              role="alert"
              id="password-error"
            >
              {data.fieldErrors.password}
            </p>
          ) : null}
        </div>
        <div>
          <FormInput
            id="password_confirm"
            type="password"
            label="Confirme a senha"
            name="password_confirm"
            defaultValue={data?.fields?.password_confirm}
            aria-invalid={
              Boolean(data?.fieldErrors?.password_confirm) || undefined
            }
            aria-errormessage={
              data?.fieldErrors?.password ? "password-error" : undefined
            }
            required
          />
          {data?.fieldErrors?.password_confirm ? (
            <p
              className="form-validation-error"
              role="alert"
              id="password-error"
            >
              {data.fieldErrors.password_confirm}
            </p>
          ) : null}
        </div>
        <div className="button__container">
          <button className="btn">Criar</button>
          <button className="btn__cancel">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
