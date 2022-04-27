import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import Pokemons from "~/components/Pokemons";
import SearchInput from "~/components/SearchInput";
import inputUrl from "~/styles/search_input.css";
import pokemonsUrl from "~/styles/pokemons.css";
import pokemonUrl from "~/styles/pokemon.css";
import errorUrl from "~/styles/error.css";
import notfoundUrl from "~/styles/not_found.css";
import { getPokemons } from "~/utils/api";
import { formatPokemonsData } from "~/utils/formatData";
import { useLoaderData } from "@remix-run/react";
import type { PokemonsFormatted } from "~/utils/types";
import Error from "~/components/Error";
import NotFound from "~/components/NotFound";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: inputUrl },
    { rel: "stylesheet", href: pokemonsUrl },
    { rel: "stylesheet", href: pokemonUrl },
    { rel: "stylesheet", href: errorUrl },
    { rel: "stylesheet", href: notfoundUrl },
  ];
};

interface LoaderData {
  pokemons: PokemonsFormatted["pokemons"];
}

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData | Response> => {
  const data = await getPokemons({});
  const { pokemons } = await formatPokemonsData({ next: 0, results: data });
  return { pokemons };
};

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const searchInput = form.get("search");
  if (!searchInput) {
    redirect(".");
  }
  return redirect(`/pokemons/${searchInput}`);
};

export default function Index() {
  const { pokemons } = useLoaderData<LoaderData>();

  return (
    <div style={{ margin: "2rem 0" }}>
      <SearchInput />
      <Pokemons pokemons={pokemons} />
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}

export function CatchBoundary() {
  return <NotFound message="We couldn'd find a course with provided ID" />;
}
