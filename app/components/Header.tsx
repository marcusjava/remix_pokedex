import { Link } from "@remix-run/react";

import logo from "~/assets/logo.png";
import ball from "~/assets/ball.png";
import type { getUser } from "~/utils/session.server";

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
            <Link to="/auth/login" className="user">
              Entrar
            </Link>
          )}
        </div>
        <img src={ball} alt="PokeBall" className="header__pokeball" />
      </div>
    </header>
  );
}
