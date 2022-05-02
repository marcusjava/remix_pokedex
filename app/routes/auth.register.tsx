import type {
  ActionFunction,
  LinksFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useSearchParams } from "@remix-run/react";
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

export interface FormFields {
  loginType: string;
  username: string;
  password: string;
  password_confirm: string;
}
export type ActionData = {
  formError?: string;
  fieldErrors?: Partial<FormFields>;
  fields?: Partial<FormFields>;
};

function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}
function validatePasswordConfirm(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

const badRequest = (data: ActionData) => {
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
    return badRequest({ formError: `Form not submitted correctly.` });
  }

  const fields = { username, password };
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
      formError: `Password and confirm password does not match`,
    });
  }

  try {
    const userExists = await db.user.findFirst({
      where: { username },
    });
    if (userExists) {
      return badRequest({
        fields,
        formError: `User with username ${username} already exists`,
      });
    }
    // create the user
    const user = await register(fields);
    if (!user) {
      return badRequest({
        fields,
        formError: `Something goes wrong when creating user`,
      });
    }

    // create their session and redirect to /jokes
    return createUserSession(user.id, "/pokemons");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default function Register() {
  const data = useActionData<ActionData>();
  const [searchParams] = useSearchParams();

  return (
    <div className="container">
      <SignUp data={data} />
    </div>
  );
}
