import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/react/routeModules";
import Pokemon from "~/components/Pokemon";
import detailsStylesUrl from "~/styles/pokemon_detail.css";
import { getPokemon } from "~/utils/api";
import { formatPokemonData } from "~/utils/formatData";
import type { PokemonFormatted } from "~/utils/types";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: detailsStylesUrl }];
};

interface LoaderData {
  pokemon: PokemonFormatted;
}

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const { name } = params;
  const data = await getPokemon(name);
  const pokemon = await formatPokemonData(data);
  return { pokemon };
};

export const action: ActionFunction = async ({ request, params }) => {};

export default function PokemonDetail() {
  const { pokemon } = useLoaderData<LoaderData>();
  return <Pokemon pokemon={pokemon} />;
}
