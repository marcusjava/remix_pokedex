import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/react/routeModules";
import Pokemon from "~/components/Pokemon";
import detailsStylesUrl from "~/styles/pokemon_detail.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: detailsStylesUrl }];
};

interface LoaderData {}

export const loader: LoaderFunction = async ({ params }) => {
  const { name } = params;
  return null;
};

export const action: ActionFunction = async ({ request, params }) => {};

export default function PokemonDetail() {
  return <Pokemon />;
}
