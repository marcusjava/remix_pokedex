import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import Header from "~/components/Header";
import Pokemons from "~/components/Pokemons";
import SearchInput from "~/components/SearchInput";
import headerUrl from "~/styles/header.css";
import inputUrl from "~/styles/search_input.css";
import pokemonsUrl from "~/styles/pokemons.css";
import pokemonUrl from "~/styles/pokemon.css";
import { getPokemons } from "~/utils/api";
import { formatPokemonsData } from "~/utils/formatData";
import { useLoaderData } from "@remix-run/react";
import type { PokemonsFormatted } from "~/utils/types";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: headerUrl },
    { rel: "stylesheet", href: inputUrl },
    { rel: "stylesheet", href: pokemonsUrl },
    { rel: "stylesheet", href: pokemonUrl },
  ];
};

interface LoaderData {
  pokemons: PokemonsFormatted["pokemons"];
}

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  //lista de pokemons
  // retornar a lista
  const response = await getPokemons({});
  const { pokemons } = await formatPokemonsData({ next: 0, results: response });
  return { pokemons };
};

export const action: ActionFunction = async ({ request, params }) => {};

export default function Index() {
  const { pokemons } = useLoaderData<LoaderData>();
  console.log(pokemons);

  return (
    <>
      <Header />;
      <SearchInput />
      <Pokemons pokemons={pokemons} />
    </>
  );
}
