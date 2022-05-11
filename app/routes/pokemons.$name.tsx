import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/react/routeModules";
import ErrorComponent from "~/components/Error";
import NotFound from "~/components/NotFound";
import Pokemon from "~/components/Pokemon";
import detailsStylesUrl from "~/styles/pokemon_detail.css";
import errorUrl from "~/styles/error.css";
import notfoundUrl from "~/styles/not_found.css";

import { getPokemon } from "~/utils/api";
import { formatPokemonData } from "~/utils/formatData";
import type { PokemonFormatted } from "~/utils/types";
import { getUser } from "~/utils/session.server";
import { db } from "~/utils/db.server";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: detailsStylesUrl },
    { rel: "stylesheet", href: errorUrl },
    { rel: "stylesheet", href: notfoundUrl },
  ];
};

interface LoaderData {
  pokemon: PokemonFormatted;
  user: Awaited<ReturnType<typeof getUser>>;
}

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<LoaderData | Response> => {
  const { name } = params;
  const user = await getUser(request);
  const data = await getPokemon(name);
  if (!data) {
    throw new Response("Not found", { status: 404 });
  }
  const pokemon = await formatPokemonData(data, user?.id);
  return { pokemon, user };
};

export const action: ActionFunction = async ({
  request,
}): Promise<Response> => {
  const form = await request.formData();
  const pokemonId = form.get("pokemonId");
  const name = form.get("name");
  const image = form.get("image");
  const userId = form.get("userId");
  if (
    typeof pokemonId !== "string" ||
    typeof name !== "string" ||
    typeof image !== "string" ||
    typeof userId !== "string"
  ) {
    throw new Error("Invalid fields");
  }

  try {
    const captured = await db.pokemon.findFirst({
      where: { userId, pokemonId },
    });

    if (captured && Object.keys(captured).length > 0) {
      await db.pokemon.delete({ where: { id: captured.id } });
    } else {
      await db.pokemon.create({
        data: {
          pokemonId,
          name,
          image,
          userId,
        },
      });
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
  return redirect("/pokemons");
};

export default function PokemonDetail() {
  const { pokemon, user } = useLoaderData<LoaderData>();

  return <Pokemon pokemon={pokemon} user={user} />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <ErrorComponent error={error} />;
}

export function CatchBoundary() {
  const caught = useCatch();
  const { name } = useParams();
  if (caught.status === 404) {
    <NotFound
      message={`We couldn'd find a pokemon with a given name - ${name}`}
    />;
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
