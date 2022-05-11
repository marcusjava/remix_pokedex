import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getPokemon } from "~/utils/api";
import { db } from "~/utils/db.server";
import { formatPokemonData } from "~/utils/formatData";
import { getUser } from "~/utils/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  const { name } = params;
  const user = await getUser(request);
  const data = await getPokemon(name);
  if (!data) {
    throw new Response("Not found", { status: 404 });
  }
  const pokemon = await formatPokemonData(data);
  try {
    const captured = await db.pokemon.findFirst({
      where: { userId: user?.id, pokemonId: String(pokemon.id) },
    });

    if (captured && Object.keys(captured).length > 0) {
      await db.pokemon.delete({ where: { id: captured.id } });
    } else {
      await db.pokemon.create({
        data: {
          pokemonId: String(pokemon.id),
          name: pokemon.name,
          image: pokemon.image,
          userId: String(user?.id),
        },
      });
    }
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
  return redirect("/pokemons");
};

export const loader: LoaderFunction = async () => {
  return redirect("/pokemons");
};
