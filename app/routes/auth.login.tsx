import type {
  ActionFunction,
  LinksFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { db } from "~/utils/db.server";
import { createUserSession, login } from "~/utils/session.server";

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
    return `Usernames must be at least 3 characters long`;
  }
}

function validatePassword(password: unknown) {
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
  const form = await request.formData();
  const username = form.get("username") as string;
  const password = form.get("password") as string;
  if (!username || !password) {
    return badRequest({ formError: `Form not submitted correctly.` });
  }

  const fields = { username, password };

  try {
    const user = await login(fields);
    if (!user) {
      return badRequest({
        fields,
        formError: "Username/Password combination is incorrect",
      });
    }

    return createUserSession(user.id, "/pokemons");
  } catch (error: any) {
    throw new Error(error.message);
  }
};
