import type { LinksFunction } from "@remix-run/node";
import Header from "~/components/Header";
import Pokemons from "~/components/Pokemons";
import SearchInput from "~/components/SearchInput";
import headerUrl from "~/styles/header.css";
import inputUrl from "~/styles/search_input.css";
import pokemonsUrl from "~/styles/pokemons.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: headerUrl },
    { rel: "stylesheet", href: inputUrl },
    { rel: "stylesheet", href: pokemonsUrl },
  ];
};

export default function Index() {
  return (
    <>
      <Header />;
      <SearchInput />
      <Pokemons />
    </>
  );
}
