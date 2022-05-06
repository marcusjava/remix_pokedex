import type {
  ActionFunction,
  LinksFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import SignIn from "~/components/SignIn";

import { createUserSession, login } from "~/utils/session.server";
import authUrl from "~/styles/authentication.css";
import inputUrl from "~/styles/form_input.css";
import { useActionData } from "@remix-run/react";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: authUrl },
    { rel: "stylesheet", href: inputUrl },
  ];
};

export interface FormFields {
  loginType: string;
  username: string;
  password: string;
  password_confirm: string;
}
type ActionData = {
  formError?: string;
  fieldErrors?: Partial<FormFields>;
  fields?: Partial<FormFields>;
};

function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return `Usuario precisa ter no minimo 3 caracteres`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Usuario precisa ter no minimo 6 caracteres`;
  }
}

const badRequest = (data: ActionData) => {
  return json(data, { status: 400 });
};

export const action: ActionFunction = async ({
  params,
  request,
}): Promise<Response> => {
  let { username, password } = Object.fromEntries(await request.formData());

  if (typeof username !== "string" || typeof password !== "string") {
    return badRequest({ formError: `Formulario não enviado corretamente .` });
  }

  const fields = { username, password };
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields });
  try {
    const user = await login(fields);
    if (!user) {
      return badRequest({
        fields,
        fieldErrors: {
          username: "Usuario/Senha incorretos",
          password: "Usuario/Senha incorretos",
        },
        formError: "Usuario/Senha incorretos",
      });
    }

    return createUserSession(user.id, "/pokemons");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default function Login() {
  const data = useActionData<ActionData>();
  return (
    <div className="container">
      <SignIn data={data} />
    </div>
  );
}
