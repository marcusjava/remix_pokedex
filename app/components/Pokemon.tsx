import { Form, useTransition } from "@remix-run/react";
import type { getUser } from "~/utils/session.server";
import type { PokemonFormatted } from "~/utils/types";

interface Props {
  pokemon: PokemonFormatted;
  user: Awaited<ReturnType<typeof getUser>>;
}

export default function Pokemon({ pokemon, user }: Props) {
  const { hp, specialAttack, specialDefense, defense, attack, speed } =
    pokemon.stats;

  return (
    <div className="detail__container">
      <div className="avatar__container">
        <img src={pokemon.image} alt="Avatar" className="avatar" />
      </div>
      <div className="detail">
        <h1 className="title">{pokemon.name}</h1>
        {pokemon.types.map((type) => (
          <span
            className="badge"
            key={type.name}
            style={{ backgroundColor: type.color }}
          >
            {type.name}
          </span>
        ))}

        <div className="stats__container">
          <p>Peso: {pokemon.weight}</p>
          <p>Altura: {pokemon.height}</p>
          {hp && (
            <p className="input-progress">
              <label htmlFor="hp">HP</label>
              <progress id="hp" value={hp} max="100"></progress>
            </p>
          )}
          {attack && (
            <p className="input-progress">
              <label htmlFor="attack">Attack</label>
              <progress id="attack" value={attack} max="100"></progress>
            </p>
          )}
          {defense && (
            <p className="input-progress">
              <label htmlFor="hp">Defense</label>
              <progress id="defense" value={defense} max="100"></progress>
            </p>
          )}
          {specialAttack && (
            <p className="input-progress">
              <label htmlFor="special-attack">Special attack</label>
              <progress
                id="special-attack"
                value={specialAttack}
                max="100"
              ></progress>
            </p>
          )}
          {specialDefense && (
            <p className="input-progress">
              <label htmlFor="special-defense">Special defense</label>
              <progress
                id="special-defense"
                value={specialDefense}
                max="100"
              ></progress>
            </p>
          )}
          {speed && (
            <p className="input-progress">
              <label htmlFor="speed">Speed</label>
              <progress id="speed" value={speed} max="100"></progress>
            </p>
          )}
        </div>
        {user?.id && (
          <Form method="post">
            <input type="hidden" name="pokemonId" value={pokemon.id} />
            <input type="hidden" name="name" value={pokemon.name} />
            <input type="hidden" name="image" value={pokemon.image} />
            <input type="hidden" name="userId" value={user.id} />
            <button className="button__danger" type="submit">
              {pokemon.captured ? " Remover" : "Adicionar"}
            </button>
          </Form>
        )}
      </div>
    </div>
  );
}
