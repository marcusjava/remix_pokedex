import FormInput from "./FormInput";

export interface FormFields {
  loginType: string;
  username: string;
  password: string;
}
type ActionData = {
  formError?: string;
  fieldErrors?: Partial<FormFields>;
  fields?: Partial<FormFields>;
};

interface Props {
  data?: ActionData;
  searchParams?: string;
}

export default function SignIn({ data }: Props) {
  return (
    <div className="card__container">
      <h3 className="title">Entrar</h3>
      <p className="subtitle">Entre com seu Usuario e Senha</p>
      <form method="post" className="login__form">
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
        <div className="button__container">
          <button className="btn">Criar</button>
          <button className="btn__cancel">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
