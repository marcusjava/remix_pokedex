import type { PokemonsFormatted } from "~/utils/types";
import PokemonCard from "./PokemonCard";

type Props = {
  pokemons: PokemonsFormatted["pokemons"];
};

export default function Pokemons({ pokemons }: Props) {
  return (
    <div className="pokemons__container">
      <div className="pokemon__list">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
