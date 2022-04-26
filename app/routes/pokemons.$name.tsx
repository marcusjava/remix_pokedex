import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/react/routeModules";
import Error from "~/components/Error";
import NotFound from "~/components/NotFound";
import Pokemon from "~/components/Pokemon";
import detailsStylesUrl from "~/styles/pokemon_detail.css";
import errorUrl from "~/styles/error.css";
import notfoundUrl from "~/styles/not_found.css";

import { getPokemon } from "~/utils/api";
import { formatPokemonData } from "~/utils/formatData";
import type { PokemonFormatted } from "~/utils/types";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: detailsStylesUrl },
    { rel: "stylesheet", href: errorUrl },
    { rel: "stylesheet", href: notfoundUrl },
  ];
};

interface LoaderData {
  pokemon: PokemonFormatted;
}

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const { name } = params;
  const data = await getPokemon(name);
  if (!data) {
    throw new Response("Not found", { status: 404 });
  }
  const pokemon = await formatPokemonData(data);
  return { pokemon };
};

export const action: ActionFunction = async ({ request, params }) => {};

export default function PokemonDetail() {
  const { pokemon } = useLoaderData<LoaderData>();
  return <Pokemon pokemon={pokemon} />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}

export function CatchBoundary() {
  return <NotFound message="We couldn'd find a pokemon with a given name" />;
}
