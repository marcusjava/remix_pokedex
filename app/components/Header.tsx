import { Link } from "@remix-run/react";

import logo from "~/assets/logo.png";
import ball from "~/assets/ball.png";

export default function Header() {
  return (
    <header className="header__container">
      <Link to="/pokemons">
        <img src={logo} alt="Pokemon" className="logo" />
      </Link>
      <div className="menu_container">
        <div className="user__container">
          <span className="user">Seja bem vindo!</span>
          <span className="logout">Sair</span>
        </div>
        <img src={ball} alt="PokeBall" className="header__pokeball" />
      </div>
    </header>
  );
}
