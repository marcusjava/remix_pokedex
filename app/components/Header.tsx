import { Link } from "@remix-run/react";

import logo from "~/assets/logo.png";
import ball from "~/assets/ball.png";

export default function Header() {
  return (
    <div className="header__container">
      <Link to="/">
        <img src={logo} alt="Pokemon" className="logo" />
      </Link>
      <div className="menu_container">
        <span className="user">Seja bem vindo!</span>
        <span className="logout">Sair</span>
        <img src={ball} alt="PokeBall" className="header__pokeball" />
      </div>
    </div>
  );
}
