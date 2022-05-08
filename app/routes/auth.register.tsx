import type {
  ActionFunction,
  LinksFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import SignUp from "~/components/SignUp";

import { db } from "~/utils/db.server";
import { createUserSession, register } from "~/utils/session.server";
import authUrl from "~/styles/authentication.css";
import inputUrl from "~/styles/form_input.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: authUrl },
    { rel: "stylesheet", href: inputUrl },
  ];
};

export interface FormRegisterFields {
  username: string;
  password: string;
  password_confirm: string;
}
export type RegisterActionData = {
  formError?: string;
  fieldErrors?: Partial<FormRegisterFields>;
  fields?: Partial<FormRegisterFields>;
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
function validatePasswordConfirm(password_confirm: unknown) {
  if (typeof password_confirm !== "string" || password_confirm.length < 6) {
    return `Usuario precisa ter no minimo 6 caracteres`;
  }
}

const badRequest = (data: RegisterActionData) => {
  return json(data, { status: 400 });
};

export const action: ActionFunction = async ({
  params,
  request,
}): Promise<Response> => {
  /*  const form = await request.formData();
  const username = form.get("username") as string;
  const password = form.get("password") as string;
  const password_confirm = form.get("password_confirm") as string; */

  let { username, password, password_confirm } = Object.fromEntries(
    await request.formData()
  );

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof password_confirm !== "string"
  ) {
    return badRequest({ formError: `Formulario não enviado corretamente .` });
  }

  const fields = { username, password, password_confirm };
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
    password_confirm: validatePasswordConfirm(password_confirm),
  };

  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields });

  //check equality passwords

  if (password !== password_confirm) {
    return badRequest({
      fields,
      fieldErrors: {
        password: "Senha e confirmação de senha não estão iguais!",
        password_confirm: "Senha e confirmação de senha não estão iguais!",
      },
      formError: `Senha e confirmação de senha não estão iguais!`,
    });
  }

  try {
    const userExists = await db.user.findFirst({
      where: { username },
    });
    if (userExists) {
      return badRequest({
        fields,
        fieldErrors: {
          username: `Usuario com o nome ${username} já está cadastrado!`,
        },
        formError: `Usuario com o nome ${username} já está cadastrado!`,
      });
    }
    // create the user
    const user = await register(fields);
    if (!user) {
      return badRequest({
        fields,
        formError: `Algo de errado ocorreu ao tentar criar o usuario, tente novamente`,
      });
    }

    // create their session and redirect to /jokes
    return createUserSession(user.id, "/pokemons");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default function Register() {
  const data = useActionData<RegisterActionData>();

  return (
    <div className="container">
      <SignUp data={data} />
    </div>
  );
}
