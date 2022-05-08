import { Link } from "@remix-run/react";

import logo from "~/assets/logo.png";
import type { getUser } from "~/utils/session.server";
import Dropdown from "./Dropdown";

type Props = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export default function Header({ user }: Props) {
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
              <form action="/logout" method="post" className="logout__form">
                <button type="submit" className="logout">
                  Sair
                </button>
              </form>
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
        <Dropdown />
      </div>
    </header>
  );
}
