import type { PokemonsFormatted } from "~/utils/types";

type Props = {
  pokemons: PokemonsFormatted;
};

export default function Pokemons({ pokemons }: Props) {
  return (
    <div className="pokemons__container">
      <div className="pokemon__list">
        <div>Pokemon Card</div>
        <div>Pokemon Card</div>
        <div>Pokemon Card</div>
        <div>Pokemon Card</div>
        <div>Pokemon Card</div>
        <div>Pokemon Card</div>
      </div>
    </div>
  );
}
