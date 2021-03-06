import { Form, Link } from "@remix-run/react";

import logo from "~/assets/logo.png";
import type { AppLoaderData } from "~/root";
import { db } from "~/utils/db.server";
import type { getUser } from "~/utils/session.server";
import Dropdown from "./Dropdown";

export default function Header({ user }: AppLoaderData) {
  return (
    <header className="header__container">
      <Link to="/pokemons">
        <img src={logo} alt="Pokemon" className="logo" />
      </Link>
      <div className="menu_container">
        <div className="user__container">
          {user?.username ? (
            <>
              <span className="user">Seja bem vindo! {user?.username}</span>
              <Form action="/logout" method="post" className="logout__form">
                <button type="submit" className="logout">
                  Sair
                </button>
              </Form>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="user">
                Entrar
              </Link>
              <Link to="/auth/register" className="user">
                Registrar
              </Link>
            </>
          )}
        </div>
        <Dropdown userId={user?.id} />
      </div>
    </header>
  );
}
