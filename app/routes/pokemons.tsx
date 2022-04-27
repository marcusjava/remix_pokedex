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
import {
  useLoaderData,
  useNavigate,
  useNavigationType,
} from "@remix-run/react";
import type { HTMLElementEvent, PokemonsFormatted } from "~/utils/types";
import Error from "~/components/Error";
import NotFound from "~/components/NotFound";
import Navigation from "~/components/Navigation";

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
  limit: string;
  offset: string;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const url = new URL(request.url);
  const limit = url.searchParams.get("limit") || "10";
  const offset = url.searchParams.get("offset") || "0";
  const data = await getPokemons({
    limit: parseInt(limit),
    offset: parseInt(offset),
  });
  const { pokemons } = await formatPokemonsData({ results: data.results });
  return { pokemons, limit, offset };
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
  const navigate = useNavigate();
  const { pokemons, limit, offset } = useLoaderData<LoaderData>();

  const handleNavigation = (
    e: HTMLElementEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { target } = e;

    const nextButtonClick =
      target.getAttribute("data-nav-operation") === "next";

    const toNextPage = +offset + +limit;
    const toPreviousPage = +offset - +limit;
    const newOffset = nextButtonClick ? toNextPage : toPreviousPage;

    navigate(`/pokemons?limit=${limit}&offset=${newOffset}`);
  };

  return (
    <div style={{ margin: "2rem 0" }}>
      <SearchInput />
      <Pokemons pokemons={pokemons} />
      <Navigation
        handleNavigation={handleNavigation}
        limit={limit}
        offset={offset}
      />
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}

export function CatchBoundary() {
  return <NotFound message="We couldn'd find a course with provided ID" />;
}
